var express = require('express'),
	path = require('path'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	events = require('events');

app.use(express.static('client'));
app.use('/textfolder', express.static('textfolder'));
// form data => multipart/formdata, bodyparser needs x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  index.html - main home
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// load note (notelist)
app.get('/notes', function (req, res) {
	//show textfolder files list (array)
	fs.readdir('./textfolder', function(err, files){
		if(err){
			console.log(err);
		} else {
			console.log(files);
		}
	});
});

//note get
app.get('/notes/:notenumber', function(req, res){

});

//new note post(create & update)
app.post('/notes/:notenumber', function(req, res){

	var testnote = req.body.notetextarea;
	// new버튼을 클릭하면 파일이 생성???
	fs.writeFile('./textfolder/test2.txt', testnote, function (err,data) {
		if (err) {
			return console.log(err);
		}
	});
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});


/////  create & using custom event
//
// var eventEmitter = new events.EventEmitter();
//
// var ringBell = function ringBell(){
//   console.log('ring ring ring');
// }
//
// eventEmitter.on('doorOpen', ringBell);
//
// eventEmitter.emit('doorOpen');
