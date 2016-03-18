var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
	// 사용자의 ID, 노트의 개수, 리스트
});

app.get('/notes/:notename', function(req, res) {

});






var server = app.listen(8080, function () {
	console.log('Server started!');
});
