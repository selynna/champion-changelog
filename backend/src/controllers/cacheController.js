var fs = require('fs-extra');
var path = require('path');
var needle = require('needle');

let cachePath = path.join(__dirname, '../../../cache/');
let cachePathDdragon =  path.join(cachePath, 'ddragon/');
let ddragonBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/';

let getFile = (async (filePath) => {
	let content = getFileFromCache(filePath);
	if(!content){
		content = await getFileFromDdragon(filePath);
	}
	if(!content){
		throw new Errors.InternalServerError('Could not get content from ddragon');
	}
	return content;
});

let getFileFromCache = ((filePath) => {
	try {
		let fullPath = path.join(cachePathDdragon, filePath);
		let content = fs.readFileSync(fullPath, {encoding:'utf8'});
		return JSON.parse(content);
	}catch(e){
		return null;
	}
});

let getFileFromDdragon = ((filePath) => {
    return new Promise((resolve, reject) => {
        needle.get(ddragonBaseUrl + filePath, (error, response, body) => {
            if(error){
                console.log('[Cache][Ddragon]', error);
                reject();
                return;
            }

			// Store file in local cache
			fs.ensureFileSync(cachePathDdragon + filePath);
			let fileStream = fs.createWriteStream(cachePathDdragon + filePath);
			fileStream.write(JSON.stringify(body));

            resolve(body);
        });
    });
});

let getChampionJson = ((championName, patchVersion, locale='en_US') => {
	let championJsonPath = `${patchVersion}/data/${locale}/champion/${championName}.json`;
	return getFile(championJsonPath);
});

module.exports = {
	getChampionJson:getChampionJson
}

// testing
//getChampionJson('Zoe', '8.22.1').then((response) => {
//	console.log(response);
//});