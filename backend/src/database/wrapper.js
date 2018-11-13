var DB = require('./base');

var debug = false;

exports.getAllPatches = ((limit) => {
	return new Promise((resolve, reject) => {
		if(!limit){
			limit = 2147483647;
		}
		DB.query(`
				SELECT *
				FROM patch
				ORDER BY date DESC
				LIMIT ?
			`, [limit], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getAllPatches] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getAllPatches] error:', error);
				reject();
			}
		}));
	});
});

exports.getCurrentPatch = (() => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch
			ORDER BY date DESC
			LIMIT 1
		`, null, ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getCurrentPatch] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getCurrentPatch] error:', error);
				reject();
			}
		}));
	});
});

exports.getCurrentPatchForDate = ((date) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			(
				SELECT *
				FROM patch
				WHERE date <= ?
				ORDER BY date DESC
				LIMIT 1
			) UNION (
				SELECT *
				FROM patch
				ORDER BY date ASC
				LIMIT 1
			)
			ORDER BY date DESC
			LIMIT 1
		`, [date], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getCurrentPatchForDate] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getCurrentPatchForDate] error:', error);
				reject();
			}
		}));
	});
});

exports.getAllChangesForChampionId = ((championId, limit) => {
	return new Promise((resolve, reject) => {
		if(!limit){
			limit = 2147483647;
		}
		DB.query(`
			SELECT *
			FROM patch_champion_changes
			WHERE championId = ?
			ORDER BY patchId DESC
			LIMIT ?
		`, [championId, limit], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getAllChangesForChampionId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getAllChangesForChampionId] error:', error);
				reject();
			}
		}));
	});
});

exports.getAllChangesForChampionIdAfterDate = ((championId, date) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch_champion_changes
			INNER JOIN patch ON (patch.id = patch_champion_changes.patchId)
			WHERE championId = ?
			AND date > ?
			ORDER BY patchId DESC
		`, [championId, date], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getAllChangesForChampionIdAfterDate] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getAllChangesForChampionIdAfterDate] error:', error);
				reject();
			}
		}));
	});
});

exports.getRelevantItemsForChampionId = ((championId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM champion_items
			WHERE championId = ?
			ORDER BY championId DESC
		`, [championId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getRelevantItemsForChampionId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getRelevantItemsForChampionId] error:', error);
				reject();
			}
		}));
	});
});

exports.getRelevantRunesForChampionId = ((championId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM champion_runes
			WHERE championId = ?
			ORDER BY runeId DESC
		`, [championId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getRelevantRunesForChampionId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getRelevantRunesForChampionId] error:', error);
				reject();
			}
		}));
	});
});

exports.getItemChangesForPatchIdAndItemId = ((patchId, itemId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch_item_changes
			WHERE patchId = ?
			AND itemId = ?
			ORDER BY patchId DESC
		`, [patchId, itemId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getItemChangesForPatchIdAndItemId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getItemChangesForPatchIdAndItemId] error:', error);
				reject();
			}
		}));
	});
});

exports.getRuneChangesForPatchIdAndRuneId = ((patchId, runeId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch_rune_changes
			WHERE patchId = ?
			AND runeId = ?
			ORDER BY patchId DESC
		`, [patchId, runeId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getRuneChangesForPatchIdAndRuneId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getRuneChangesForPatchIdAndRuneId] error:', error);
				reject();
			}
		}));
	});
});

exports.getAllItemChangesForPatchIdAndChampionId = ((patchId, championId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch_item_changes
			RIGHT JOIN champion_items ON (champion_items.itemId = patch_item_changes.itemId)
			WHERE patch_item_changes.patchId = ?
			AND champion_items.championId = ?
			ORDER BY champion_items.itemId ASC
		`, [patchId, championId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getAllItemChangesForPatchIdAndChampionId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getAllItemChangesForPatchIdAndChampionId] error:', error);
				reject();
			}
		}));
	});
});

exports.getAllRuneChangesForPatchIdAndChampionId = ((patchId, championId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch_rune_changes
			RIGHT JOIN champion_runes ON (champion_runes.runeId = patch_rune_changes.runeId)
			WHERE patch_rune_changes.patchId = ?
			AND champion_runes.championId = ?
			ORDER BY champion_runes.runeId ASC
		`, [patchId, championId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getAllRuneChangesForPatchIdAndChampionId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getAllRuneChangesForPatchIdAndChampionId] error:', error);
				reject();
			}
		}));
	});
});

exports.getAllPatchesAfterPatchId = ((patchId) => {
	return new Promise((resolve, reject) => {
		DB.query(`
			SELECT *
			FROM patch
			WHERE date >= (
				SELECT date
				FROM patch
				WHERE id = ?
			)
			ORDER BY date DESC
		`, [patchId], ((data, error) => {
			if(!error){
				if(debug) console.log('[DEBUG][getAllPatchesAfterPatchId] result:', data);
				resolve(data);
			}else{
				if(debug) console.log('[DEBUG][getAllPatchesAfterPatchId] error:', error);
				reject();
			}
		}));
	});
});

exports.getAllItemChangesForChampionIdAfterPatchId = ((championId, patchId) => {
	return new Promise(async (resolve, reject) => {
		let result = {};
		let patches = await exports.getAllPatchesAfterPatchId(patchId);
		if(!patches){
			reject();
			return;
		}

		let i = 0;
		patches.forEach(async (patch) => {
			let changes = await exports.getAllItemChangesForPatchIdAndChampionId(patch.id, championId);
			result[patch.id] = changes;
			if(++i == patches.length){
				resolve(result);
			}
		});
	});
});

exports.getAllRuneChangesForChampionIdAfterPatchId = ((championId, patchId) => {
	return new Promise(async (resolve, reject) => {
		let result = {};
		let patches = await exports.getAllPatchesAfterPatchId(patchId);
		if(!patches){
			reject();
			return;
		}

		let i = 0;
		patches.forEach(async (patch) => {
			let changes = await exports.getAllRuneChangesForPatchIdAndChampionId(patch.id, championId);
			result[patch.id] = changes;
			if(++i == patches.length){
				resolve(result);
			}
		});
	});
});

// testing
if(debug){
	exports.getCurrentPatch().then((response) => {
		console.log(response);
	});
//	exports.getAllPatches().then((response) => {
//		console.log(response);
//	});
//	var x = exports.getAllItemChangesForChampionIdAfterPatchId(104, '8.1');
//	console.log('x', x);
//	exports.getAllItemChangesForChampionIdAfterPatchId(15, '8.13').then((response) => {
//		console.log('xxx', response);
//	});
//	exports.getCurrentPatchForDate(new Date('2018-11-08T23:50:00.600Z')).then((response) => {
//		console.log(response);
//	});
//	exports.getAllChangesForChampionIdAfterDate(142, new Date('2018-01-01')).then((response) => {
//		console.log(response);
//	});
//	exports.getAllItemChangesForPatchIdAndChampionId('8.22', 1).then((response) => {
//		console.log(response);
//	});
}