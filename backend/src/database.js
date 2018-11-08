var express    = require("express");
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'riotpatchnotes'
});
var app = express();

connection.connect(function(err){
	if(!err){
		console.log("(DEBUG) db connected");    
	}else{
		console.log("(DEBUG) db connection error");    
	}
});

exports.getAllPatches = function(limit){
	if(!limit){
		limit = 2147483647;
	}
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch ORDER BY id DESC LIMIT ?', [limit], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getAllChangesForChampionId = function(championId, limit){
	if(!limit){
		limit = 2147483647;
	}
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_champion_changes WHERE championId = ? ORDER BY patchId DESC LIMIT ?', [championId, limit], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getAllChangesForChampionIdAfterDate = function(championId, date){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_champion_changes JOIN patch ON (patch.id = patch_champion_changes.patchId) WHERE championId = ? AND date > ? ORDER BY patchId DESC', [championId, date], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getRelevantItemsForPatchIdAndChampionId = function(patchId, championId){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_champion_items WHERE patchId = ? AND championId = ? ORDER BY patchId DESC', [patchId, championId], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getRelevantRunesForPatchIdAndChampionId = function(patchId, championId){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_champion_runes WHERE patchId = ? AND championId = ? ORDER BY patchId DESC', [patchId, championId], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getItemChangesForPatchIdAndItemId = function(patchId, itemId){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_item_changes WHERE patchId = ? AND itemId = ? ORDER BY patchId DESC', [patchId, itemId], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getRuneChangesForPatchIdAndRuneId = function(patchId, runeId){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_rune_changes WHERE patchId = ? AND runeId = ? ORDER BY patchId DESC', [patchId, runeId], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getAllItemChangesForPatchIdAndChampionId = function(patchId, championId){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_item_changes RIGHT JOIN patch_champion_items ON (patch_champion_items.patchId = patch_item_changes.patchId AND patch_champion_items.itemId = patch_item_changes.itemId) WHERE patch_champion_items.patchId = ? AND patch_champion_items.championId = ? ORDER BY patch_champion_items.itemId DESC', [patchId, championId], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getAllRuneChangesForPatchIdAndChampionId = function(patchId, championId){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM patch_rune_changes RIGHT JOIN patch_champion_runes ON (patch_champion_runes.patchId = patch_rune_changes.patchId AND patch_champion_runes.itemId = patch_rune_changes.runeId) WHERE patch_champion_runes.patchId = ? AND patch_champion_runes.championId = ? ORDER BY patch_champion_runes.runeId DESC', [patchId, championId], function(err, rows, fields){
			connection.end();
			if(!err){
//				console.log('(DEBUG) result: ', rows);
				resolve(rows);
			}else{
//				console.log('(DEBUG) db query error: ' + err);
				reject();
			}
		});
	})
};

exports.getAllPatches(1).then((response) => {
	console.log(response);
});