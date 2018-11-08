const needle = require("needle")
const APIKey = 'RGAPI-7b3d9296-3300-4ff6-a4a7-b34b0e28000d';
const database = require("../database");
let lastPlayed = (summoner, champion) => {return new Promise(async (resolve, reject) => {
    let accountId = 1;
    try {
        accountId = await getAccountIDFromSummonerName((summoner));
    } catch(e) {
        reject();
        return;
    }
    needle.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${APIKey}`, async (error, response,body) => {
        if (error) {
            console.log(body);
            reject();
            return;
        }
        let championId = await getChampionIDFromName(champion);
        let lastPlayedGame = body.matches.find((game)=> {
            return game.champion == championId;
        });
        if (!lastPlayedGame) {
            console.log("Could not find match with that champion recently, so defaulting to 12 months...");
            resolve({lastPlayed: (new Date((Date.now()-1000*60*60*24*365)))});
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
            console.log(body);
            reject();
            return;
        }
        resolve(body.accountId);
    })
})
}

let getChampionIDFromName = async (championName) => { //Champion Name is case sensitive, Syndra, not syndra
    let body = await getChampionFromDDragon(championName);
    return body.data[championName].key;
}

let getChampionFromDDragon = (championName, patchVersion="8.22.1") => {
    console.log(`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${championName}.json`)
    return new Promise((resolve, reject) => {
        needle.get(`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${championName}.json`, (error, response,body) => {
            if (error) {
                console.log(body);
                reject();
                return;
            }

            resolve(body);
        })
    })
}

let statChanges = async (req, res) => {
    let stats = await getChampionDifferences(req.params.champion, req.params.patch)
    res.status(200).send(stats);
}

let getChampionDifferences = async (championName, patchVersion) => { // get the differences of that champion since the version
    let currentStats = (await getChampionFromDDragon(championName)).data[championName].stats
    let oldStats = (await getChampionFromDDragon(championName, patchVersion)).data[championName].stats
    let statDifferences = {}
    Object.keys(currentStats).forEach((key)=> {
        let difference = currentStats[key] - oldStats[key]
        statDifferences[key] = {stat: currentStats[key], statChange: difference}
    });
    return statDifferences;
}

let getAllData = async (req, res) => {
    let allData = {runeChanges: {}, itemChanges: {}}
    allData.lastPlayed = await lastPlayed(req.params.summoner, req.params.champion);
    console.log(allData)
    let patchId = (await database.getCurrentPatchForDate(allData.lastPlayed))[0].id
    console.log("hello")
    console.log(patchId);
    longPatchId = patchId+".1";
    allData.baseStatDifferences = await getChampionDifferences(req.params.champion, longPatchId)
    let championId = await getChampionIDFromName(req.params.champion);
    allData.championChanges = await database.getAllChangesForChampionIdAfterDate(championId,allData.lastPlayed);
    console.log(patchId, championId)
    console.log(await database.getAllItemChangesForPatchIdAndChampionId("8.15", "104"))
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