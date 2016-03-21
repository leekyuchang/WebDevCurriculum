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
});

app.get('/main', function(req, res) {
	var obj;
	fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
		} else {
			obj = JSON.parse(data);
			// console.log(obj);
			// 사용자의 ID, 노트의 개수, 리스트
			res.send(data);
		};
	});
});

app.get('/notes/:notename', function(req, res) {
	// 이름, 내용, Edit Button
});

// edit버튼 클릭 get ajax사용하여 서버에서 json form내용 가져오기
app.get('/notes/edit/:notename', function(req, res) {
	// Html의 Form형태 - 이름, 내용, Save Button
});

// save버튼 클릭 post ajax사용하여 서버에서 json에 form 내용 저장, (redirect /notes/:notename)
app.post('/notes/edit/:notename', function(req, res) {

});



var server = app.listen(8080, function () {
	console.log('Server started!');
});
