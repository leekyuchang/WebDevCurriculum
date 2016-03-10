var express = require('express'),
	path = require('path'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	events = require('events');

app.use(express.static('client'));
// app.use('/textfolder', express.static('textfolder'));

// form data => multipart/formdata, bodyparser needs x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  index.html
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// load note
app.get('/notelist', function (req, res) {
	//show textfolder files list (array)
	fs.readdir('./textfolder', function(err, files){
		if(err){
			console.log(err);
		} else {
			console.log(files);
		}
	});
});

app.get('/notelist/note', function(req, res){
	// show text content.
	// fs.readFile('./textfolder/test1.txt', 'utf8', function(error, data){
	// 	if(error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log(data);
	// 	}
	// });
});

// (파일을 누르면 text가 보여진다. 바로 편집 가능)
// single page -> XMLHttpRequest 사용

//  new note 노트별로 분리가 되야 한다.
//  노트를 만들면 노트이름?은 url로 넘겨야 되나? 그래야 load될꺼 같기도 하고
app.post('/', function(req, res){

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
