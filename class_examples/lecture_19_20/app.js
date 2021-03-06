var express = require('express')
var app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');

/* Add a link to the db */
app.get('/addLink', function(req, res){
    var long_url = req.query.long_url;
    var short_url = req.query.short_url;

    db.run("INSERT INTO links " +
    	"(long_url, short_url, hit_count) " +
    	"VALUES (?, ?, ?)", 
    		long_url, 
    		short_url,
    		0);

	res.json({"long_url": long_url,
			"short_url": short_url});
});

/* return all of the links in the db */
app.get('/getAllLinks', function(req, res) {
	res.json({ "data": [
		{'long_url': "http://google.com",
		  'short_url': 'asdfe',
		  'hit_count': '4' },
		 {'long_url': "http://facebook.com",
		  'short_url': 'wefes',
		  'hit_count': '2' }
		]})
});

/* Create table: should run only once */
app.get('/createTable', function(req, res) {
	db.run("CREATE TABLE links (" +
		"long_url varchar(255)," +
		"short_url varchar(255)," +
		"hit_count int)");

	res.json({});	
})


var server = app.listen(3000, function() {
	console.log('Server on localhost listening on port 3000');
});