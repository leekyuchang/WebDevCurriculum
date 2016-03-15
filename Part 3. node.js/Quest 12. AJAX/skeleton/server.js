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

// GET /notes  <--list
// POST /notes/  <--create
// GET /notes/:id <--read
// PUT /notes/:id  <--update

//load note (notelist get)             /// LIST
app.get('/notes', function (req, res) {
	//show textfolder files list (array)
	fs.readdir('./textfolder', function(err, files){
		if(err){
			console.log(err);
		} else {
			console.log(files);
			files.forEach(function(file){
        		res.write('<a href=' + '/notes/' + file + '>' + file + '<br>');
    		});
		}
	});
});

//create note (note post)
// app.post('/notes', function(req, res){
// 	res.
// });

//? note content get(load)                       /// READ
app.get('/notes/:notenumber', function(req, res){
	var notepath = path.join(__dirname, './textfolder', req.params.notenumber);
	fs.readFile(notepath, 'utf8', function(err, data){
		if(err) {
			console.log(err);
		} else {
			console.log(data);
			res.end('note number '+ req.params.notenumber + ': ' + data);
		}
	});
});

//? new note post(create & update)                /// CREATE
app.post('/notes/:notenumber', function(req, res){
	var notepath = path.join(__dirname, './textfolder', req.params.notenumber + '.txt');
	var testnote = req.body.notetextarea;
	// new버튼을 클릭하면 파일이 생성???
	fs.writeFile(notepath, testnote, function (err,data) {
		if (err) {
			return console.log(err);
		} else {
			console.log(data);

		}
	});
});


/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});


//req.params.
//req.query.
//req.body.



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
