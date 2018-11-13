var needle = require("needle")
var database = require("../database/wrapper");
var cache = require('./cacheController');

const APIKey = 'RGAPI-7b3d9296-3300-4ff6-a4a7-b34b0e28000d';

let lastPlayed = (summoner, champion) => {return new Promise(async (resolve, reject) => {
    let accountId = 1;
    try {
        accountId = await getAccountIDFromSummonerName((summoner));
    } catch(e) {
        console.log(e)
        reject();
        return;
    }
    needle.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${APIKey}`, async (error, response,body) => {
        if (error) {
            console.log(error)
            console.log(body);
            reject();
            return;
        }
		let currentPatchVersion = await getCurrentPatchVersion();
		let currentChampionJson = await cache.getChampionJson(champion, currentPatchVersion);
        let championId = currentChampionJson.data[champion].key;
        let lastPlayedGame = body.matches.find((game)=> {
            return game.champion == championId;
        });
        if (!lastPlayedGame) {
            console.log("Could not find match with that champion recently, so defaulting to 12 months...");
            resolve(new Date((Date.now()-1000*60*60*24*365)));
            return;
        }
        let lastPlayed = new Date(lastPlayedGame.timestamp);
        resolve(lastPlayed);
    })
})
}

let getAccountIDFromSummonerName = (summonerName) => { return new Promise((resolve, reject)  => {
    needle.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${APIKey}`, (error, response,body) => {
        if (error) {
            console.log(error);
            reject();
            return;
        }
        resolve(body.accountId);
    })
})
}

let getCurrentPatchVersion = (async () => {
	let currentPatch = await database.getCurrentPatch();
	let currentPatchId = currentPatch[0].id;
	let currentPatchVersion = currentPatchId + '.1';
	return currentPatchVersion;
});

let statChanges = async (req, res) => {
    let stats = await getChampionDifferences(req.params.champion, req.params.patch)
    res.status(200).send(stats);
}

let getChampionDifferences = async (championName, patchVersion) => { // get the differences of that champion since the version
	let currentPatchVersion = await getCurrentPatchVersion();
	let currentChampionJson = await cache.getChampionJson(championName, currentPatchVersion);
	let oldChampionJson = await cache.getChampionJson(championName, patchVersion);
    let currentStats = currentChampionJson.data[championName].stats
    let oldStats = oldChampionJson.data[championName].stats
    let statDifferences = {}
    Object.keys(currentStats).forEach((key)=> {
        let difference = currentStats[key] - oldStats[key]
        statDifferences[key] = {stat: currentStats[key], statChange: difference}
    });
    return statDifferences;
}

let getAllData = async (req, res) => {
    let allData = {}
    allData.lastPlayed = await lastPlayed(req.params.summoner, req.params.champion);
    console.log(allData.lastPlayed);
    let patchId = (await database.getCurrentPatchForDate(allData.lastPlayed))[0].id
    allData.lastPlayedPatch = patchId;
    longPatchId = patchId+".1";
    console.log(longPatchId)
	let currentPatchVersion = await getCurrentPatchVersion();
    allData.baseStatDifferences = await getChampionDifferences(req.params.champion, longPatchId)
	let currentChampionJson = await cache.getChampionJson(req.params.champion, currentPatchVersion);
    let championId = currentChampionJson.data[req.params.champion].key;
    allData.championChanges = await database.getAllChangesForChampionIdAfterDate(championId,allData.lastPlayed);
    allData.championChanges.forEach((patchData) => {
        patchData.changes = JSON.parse(patchData.changes)
        patchData.changes.forEach((skill) => {
            Object.keys(skill).forEach((key) => { // key is COOLDOWN
                if(key=="name") return;
                if(skill[key].removed) {
                    skill[key].isBuff = false;
                    return;
                }
                if(skill[key].after && !skill[key].before) {
                    skill[key].isBuff = true;
                    return;
                }
                if ((key.includes("COOLDOWN") || key.includes("COST")) && !key.includes("COST REFUND")) {
                    skill[key].isBuff = parseInt(skill[key].after.split(/[^0-9]/)[0]) < parseInt(skill[key].before.split(/[^0-9]/)[0])
                    return;
                }
                skill[key].isBuff = parseInt(skill[key].after.split(/[^0-9]/)[0]) > parseInt(skill[key].before.split(/[^0-9]/)[0])
            })
        })
    })
    allData.runeChanges = await database.getAllRuneChangesForChampionIdAfterPatchId(championId,patchId);
    Object.keys(allData.runeChanges).forEach((patchKeys) => {
        allData.runeChanges[patchKeys].forEach((rune, i) => {
            allData.runeChanges[patchKeys][i].changes = JSON.parse(allData.runeChanges[patchKeys][i].changes)
            Object.keys(rune.changes).forEach((key) => { // key is COOLDOWN
                if(key=="name") return;
                let divider = rune.changes[key].indexOf(" => ")
                let before = (rune.changes[key].substring(0,divider)).split(/[^0-9]/);
                let after = (rune.changes[key].substring(divider + 4, rune.changes[key].length)).split(/[^0-9]/);
                if (before.length == 0 || after.length == 0) return;

                if ((key.includes("COOLDOWN") || key.includes("COST")) && !key.includes("COST REFUND")) {
                    rune.changes.isBuff = parseInt(after[0]) < parseInt(before[0])
                    return;
                }
                rune.changes.isBuff = parseInt(after[0]) > parseInt(before[0])
            })
        })
    })
    allData.itemChanges = await database.getAllItemChangesForChampionIdAfterPatchId(championId,patchId);
    Object.keys(allData.itemChanges).forEach((patchKeys) => {
        allData.itemChanges[patchKeys].forEach((rune, i) => {
            allData.itemChanges[patchKeys][i].changes = JSON.parse(allData.itemChanges[patchKeys][i].changes)
            let item = allData.itemChanges[patchKeys][i].changes;
            let before = item.attributes[0]["attribute-before"]
            let after = item.attributes[0]["attribute-after"]
            item.isBuff = parseInt(after.split(/[^0-9]/)[0]) > parseInt(before.split(/[^0-9]/)[0])
            if (item.attributes[0].attribute.includes("COOLDOWN") || item.attributes[0].attribute.includes("COST")) {
                item.isBuff = !item.isBuff
            }
        })
    })
    // console.log(await database.getAllItemChangesForPatchIdAndChampionId("8.15", "104"))
    // let items = (await database.getRelevantItemsForChampionId(championId)).map((element) => element.itemId)
    // console.log(items)
    // // console.log("runes")
    // let runes = (await database.getRelevantRunesForChampionId(championId)).map((element) => element.runeId)
    // console.log(runes)
    // await items.forEach(async (itemId) => {
    //     console.log(await database.getAllItemChangesForPatchIdAndChampionId(patchId, itemId))
    //     // allData.itemChanges[itemId] = await database.getAllItemChangesForPatchIdAndChampionId(patchId, itemId);
    // })
    // await runes.forEach(async (runeId) => {
    //     console.log(patchId, runeId)
    //     console.log(await database.getAllRuneChangesForPatchIdAndChampionId(patchId, runeId))
    //     allData.runeChanges[runeId] = await database.getAllRuneChangesForPatchIdAndChampionId(patchId, runeId);
    // })
    res.status(200).send(allData);
}


module.exports = {
    lastPlayed: lastPlayed,
    statChanges: statChanges,
    getAllData: getAllData
}
