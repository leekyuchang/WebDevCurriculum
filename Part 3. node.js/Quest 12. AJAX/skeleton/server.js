var express = require('express'),
	path = require('path'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	events = require('events');

app.use(express.static('client'));
app.use('/textfolder', express.static('textfolder'));


// form data => multipart/formdata, bodyparser needs x-www-form-urlencoded or json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  index.html
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});


//note파일들을 어떻게 불러오지???? (req.params, req.query) 사용같은데... url로...
//

// load note
// (파일을 누르면 text가 보여진다. 바로 편집 가능)
// single page -> XMLHttpRequest 사용
// app.get('/', function(req, res){
//
// 	// (load버튼을 누르면 textfolder에 있는 파일들이 보여진다.)
//
//
// 	console.log('Hi');
// 	// res.sendFile(path.join(__dirname, '/textfolder');
// });

//  new note 노트별로 분리가 되야 한다.
//  노트를 만들면 노트이름?은 url로 넘겨야 되나? 그래야 load될꺼 같기도 하고
app.post('/', function(req, res){

	// new버튼을 클릭하면 파일이 생성???

	// submit 버튼 클릭하면 notetextarea글 console로 읽어짐
	var testnote = req.body.notetextarea;
	console.log(req.body);
	console.log(req.body.notetextarea);

	// fs를 이용해서 파일 create 하기

});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});


// load
// save
// close



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

// var loadevent = new events.EventEmitter();
// var loadfunc = function loadfunc(){
// 	console.log('Hi I"m loadfunc');
// }
// loadevent.on('clickloadbtn', loadfunc);
//
// loadevent.emit('clickloadbtn');
