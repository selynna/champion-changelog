const needle = require("needle")
const APIKey = 'RGAPI-7b3d9296-3300-4ff6-a4a7-b34b0e28000d';
let lastPlayed = async (req, res) => {
    let accountId = 1;
    try {
        accountId = await getAccountIDFromSummonerName((req.params.summoner));
    } catch(e) {
        res.status(500).send("Internal Server Error");
        return;
    }
    needle.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${APIKey}`, async (error, response,body) => {
        if (error) {
            console.log(body);
            res.status(500).send("Internal Server Error");
            return;
        }
        let championId = await getChampionIDFromName(req.params.champion);
        let lastPlayedGame = body.matches.find((game)=> {
            return game.champion == championId;
        });
        if (!lastPlayedGame) {
            console.log("Could not find match with that champion recently, so defaulting to 12 months...");
            res.status(200).send({lastPlayed: (new Date((Date.now()-1000*60*60*24*365)))});
            return;
        }
        let lastPlayed = new Date(lastPlayedGame.timestamp);
        res.status(200).send({lastPlayed: lastPlayed});
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

module.exports = {
    lastPlayed: lastPlayed,
    statChanges: statChanges
}