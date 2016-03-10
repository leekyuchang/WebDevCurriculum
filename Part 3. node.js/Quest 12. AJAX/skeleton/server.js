var express = require('express'),
	path = require('path'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser');


app.use(express.static('client'));

//  index.html
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
	//note파일들을 어떻게 불러오지???? (req.params, req.param(), req.body ) 사용같은데... url로...
	//
});

// load note
app.get('/load', function(req, res){
	res.sendFile(path.join(__dirname, notename()));
});

//  new not
app.post('/', function(req, res){
	var testnote = req.body.notetextarea;
	console.log(testnote);
	console.log(req.body);

});

function notename(){
	return '/textfolder/test2.txt';
}

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});


// load
// save
// close



/////  create & using custom event
// var events = require('events');
// var eventEmitter = new events.EventEmitter();
//
// var ringBell = function ringBell(){
//   console.log('ring ring ring');
// }
//
// eventEmitter.on('doorOpen', ringBell);
//
// eventEmitter.emit('doorOpen');
