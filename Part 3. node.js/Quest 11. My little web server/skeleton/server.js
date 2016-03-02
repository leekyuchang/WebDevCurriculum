// 1. Hello World!
// var http = require('http');
//
// http.createServer(function(req, res) {
// 	// TODO: 이 곳을 채워넣으세요..!
// 	//res.writeHead(200, {'Content-Type': 'text/plain'});//response header를 request에 보낸다. 200은 HTTP상태, 마지막 인자는 header
// 	res.write('Hello World!');
// 	res.end();
// }).listen(8080);


var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var bar = '123';
	var pathname = url.parse(req.url, true).pathname;
	if(req.method == 'GET'){
		res.write('Hello ' +  bar + 'GET');
	} else if (req.method == 'POST'){
		res.write('Hello ' +  bar + 'POST');
	} else {
		res.write('Hello World!');
	}

	res.end();
}).listen(8080);
