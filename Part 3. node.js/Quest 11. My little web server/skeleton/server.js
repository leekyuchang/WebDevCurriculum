var http = require('http');
var url = require('url');
var qs = require('querystring');
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});

	var pathname = url.parse(req.url, true).pathname;
	var queryobj = url.parse(req.url, true).query;
	var bar = queryobj.bar;
	if(pathname == '/') {
		res.write('Hello World!');
		res.end();
	} else if(pathname == '/foo' && req.method == 'GET') {

		if (bar != undefined) {
			res.write('Hello ' +  bar + ' GET');
			res.end();
		}
		else {
			res.write('Hello World');
			res.end();
		}

	} else if (pathname == '/foo' && req.method == 'POST') {
		var body = '';
		console.log('/foo & POST');
		req.on('data', function(data){
			body += data;
		});
		req.on('end', function(){
			var post = qs.parse(body);
			res.write('Hello ' +  post['bar'] + ' POST');
			res.end();
		});

	}

}).listen(8080);
