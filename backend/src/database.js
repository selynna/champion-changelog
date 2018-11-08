var mysql = require('mysql');

var debug = true;
var connection = mysql.createConnection({
	host:'aurora.lolskill.net',
	user:'hackathon',
	password:'yoBhM61tfxSEJCxS',
	database:'hackathon'
});

connection.connect(function(err){
	if(debug){
		if(!err){
			console.log("(DEBUG) db connected");    
		}else{
			console.log("(DEBUG) db connection error");    
		}
	}
});

exports.getAllPatches = function(limit){
	if(!limit){
		limit = 2147483647;
	}
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM patch
			ORDER BY date DESC
			LIMIT ?
		`, [limit], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getCurrentPatchForDate = function(date){
	return new Promise((resolve, reject) => {
		connection.query(`
			(
				SELECT *
				FROM patch
				WHERE date <= ?
				LIMIT 1
			) UNION (
				SELECT *
				FROM patch
				ORDER BY date ASC
				LIMIT 1
			)
			ORDER BY date DESC
			LIMIT 1
		`, [date], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getAllChangesForChampionId = function(championId, limit){
	if(!limit){
		limit = 2147483647;
	}
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM patch_champion_changes
			WHERE championId = ?
			ORDER BY patchId DESC
			LIMIT ?
		`, [championId, limit], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getAllChangesForChampionIdAfterDate = function(championId, date){
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM patch_champion_changes
			INNER JOIN patch ON (patch.id = patch_champion_changes.patchId)
			WHERE championId = ?
			AND date > ?
			ORDER BY patchId DESC
		`, [championId, date], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getRelevantItemsForChampionId = function(championId){
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM champion_items
			WHERE championId = ?
			ORDER BY championId DESC
		`, [championId], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getRelevantRunesForChampionId = function(championId){
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM champion_runes
			WHERE championId = ?
			ORDER BY runeId DESC
		`, [championId], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getItemChangesForPatchIdAndItemId = function(patchId, itemId){
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM patch_item_changes
			WHERE patchId = ?
			AND itemId = ?
			ORDER BY patchId DESC
		`, [patchId, itemId], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getRuneChangesForPatchIdAndRuneId = function(patchId, runeId){
	return new Promise((resolve, reject) => {
		connection.query(`
			SELECT *
			FROM patch_rune_changes
			WHERE patchId = ?
			AND runeId = ?
			ORDER BY patchId DESC
		`, [patchId, runeId], function(err, rows, fields){
			if(!err){
				if(debug) console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
				if(debug) console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	}).then(function(){
//		connection.end();
	})
};

exports.getAllItemChangesForPatchIdAndChampionId = function(patchId, championId, cb){
	connection.query(`
		SELECT *
		FROM patch_item_changes
		RIGHT JOIN champion_items ON (champion_items.itemId = patch_item_changes.itemId)
		WHERE patch_item_changes.patchId = ?
		AND champion_items.championId = ?
		ORDER BY champion_items.itemId ASC
	`, [patchId, championId], function(err, rows, fields){
		if(!err){
			if(debug) console.log('(DEBUG) result: ', rows);
			cb(rows);
		}else{
			if(debug) console.log('(DEBUG) db query error: ' + err);
			cb(null);
		}
	});
};

exports.getAllRuneChangesForPatchIdAndChampionId = function(patchId, championId, cb){
	connection.query(`
		SELECT *
		FROM patch_rune_changes
		RIGHT JOIN champion_runes ON (champion_runes.runeId = patch_rune_changes.runeId)
		WHERE patch_rune_changes.patchId = ?
		AND champion_runes.championId = ?
		ORDER BY champion_runes.runeId ASC
	`, [patchId, championId], function(err, rows, fields){
		if(!err){
			if(debug) console.log('(DEBUG) result: ', rows);
			cb(rows);
		}else{
			if(debug) console.log('(DEBUG) db query error: ' + err);
			cb(null);
		}
	});
};

exports.getAllPatchesAfterPatchId = function(patchId, cb){
	connection.query(`
		SELECT *
		FROM patch
		WHERE date >= (
			SELECT date
			FROM patch
			WHERE id = ?
		)
		ORDER BY date DESC
	`, [patchId], function(err, rows, fields){
		if(!err){
			if(debug) console.log('(DEBUG) result: ', rows);
			cb(rows);
		}else{
			if(debug) console.log('(DEBUG) db query error: ' + err);
			cb(null);
		}
	});
};

exports.getAllItemChangesForChampionIdAfterPatchId = function(championId, patchId){
	return new Promise((resolve, reject) => {
		var result = {};

		exports.getAllPatchesAfterPatchId(patchId, (rows) => {			
			if(!rows){
				return;
			}
			
			let i = 0;
			rows.forEach(function(row){
				var patchId = row.id;

				exports.getAllItemChangesForPatchIdAndChampionId(patchId, championId, (itemChanges) => {
					i++;
					result[patchId] = itemChanges;
					if (i==rows.length){
						resolve(result);
					}
				});
			});
			
		});
	})
};

exports.getAllRuneChangesForChampionIdAfterPatchId = function(championId, patchId){
	return new Promise((resolve, reject) => {
		var result = {};

		exports.getAllPatchesAfterPatchId(patchId, (rows) => {			
			if(!rows){
				return;
			}
			
			let i = 0;
			rows.forEach(function(row){
				var patchId = row.id;

				exports.getAllRuneChangesForPatchIdAndChampionId(patchId, championId, (runeChanges) => {
					i++;
					result[patchId] = runeChanges;
					if (i==rows.length){
						resolve(result);						
					}
				});
			});
			
		});
	})
};

// testing
if(debug){
//	var x = exports.getAllItemChangesForChampionIdAfterPatchId(104, '8.1');
//	console.log('x', x);
	exports.getAllItemChangesForChampionIdAfterPatchId(104, '8.1').then((response) => {
		console.log('xxx', response);
	});
//	exports.getCurrentPatchForDate(new Date('2017-11-08T21:33:49.987Z')).then((response) => {
//		console.log(response);
//	});
//	exports.getAllChangesForChampionIdAfterDate(142, new Date('2018-01-01')).then((response) => {
//		console.log(response);
//	});
//	exports.getAllItemChangesForPatchIdAndChampionId('8.22', 1).then((response) => {
//		console.log(response);
//	});
}