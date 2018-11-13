var mysql = require('mysql2');
var config = require('./config');

var pool = mysql.createPool(config);

var DB = (() => {
	function _query(query, params, callback){
		pool.getConnection((err, connection) => {
			if(err){
				if(connection && connection.release){
					connection.release();
				}
				callback(null, err);
				throw err;
			}

			connection.query(query, params, ((err, rows) => {
				if(connection && connection.release){
					connection.release();
				}
				if(!err){
					callback(rows);
				}else{
					callback(null, err);
				}
			}));

			connection.on('error', ((err) => {
				if(connection && connection.release){
					connection.release();
				}
				callback(null, err);
				throw err;
			}));
		});
	};

	return {
		query: _query
	};
})();

module.exports = DB;