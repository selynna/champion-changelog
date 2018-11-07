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

exports.getAllPatches = function(){
	return new Promise((resolve, reject) => {
		connection.query('SELECT * from patch ORDER BY id DESC', function(err, rows, fields){
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