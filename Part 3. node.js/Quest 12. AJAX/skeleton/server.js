var express = require('express'),
	path = require('path'),
	app = express(),
	fs = require('fs');

app.use(express.static('client'));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));

});

 // var stream = fs.createReadStream('/client/test1.txt');

app.get('/text', function(req, res){
	var body = "";
	var filePath = path.join(__dirname, '/client/test1.txt');
	var testtext = fs.createReadStream(filePath);

	req.on('data', function(data) {
        body += data;
    });

    req.on('end', function (){
		res.end();
    });
});
/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

var server = app.listen(8080, function () {
	console.log('Server started!');
});


//
// new
// load
// save
// close
