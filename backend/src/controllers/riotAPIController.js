const needle = require("needle")
const APIKey = 'RGAPI-7b3d9296-3300-4ff6-a4a7-b34b0e28000d';
let lastPlayed = async (req, res) => {
    let accountId = 1;
    try {
        accountId = await getAccountIDFromSummonerName((req.summoner ? req.summoner : "golang"));
    } catch(e) {
        res.status(500).send("Internal Server Error");
        return;
    }
    needle.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${APIKey}`, (error, response,body) => {
        if (error) {
            console.log(body);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.status(200).send(body);
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

let getChampionIDFromName = (championName) => {
    return new Promise((resolve, reject) => {
        
    })
}

module.exports = {
    lastPlayed: lastPlayed
}