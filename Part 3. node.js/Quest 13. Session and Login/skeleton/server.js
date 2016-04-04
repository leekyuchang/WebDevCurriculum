var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	session = require('express-session'),
	bodyParser = require('body-parser');
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret : '!@#asdf!@#gre',
	resave : true,
	saveUninitialized : false
}));

app.use('/static', express.static('static'));

var user = [
	{	uid : 'test1',
		username : 'test1',
		password : 'test1'},
	{	uid : 'test2',
		username : 'test2',
		password : 'test2'},
	{	uid : 'test3',
		username : 'test3',
		password : 'test3'}
];

app.get('/', function (req, res) {

	if(req.session.username) {
		res.sendFile(path.join(__dirname, 'static/index.html'));
	} else {
		res.send('Please login ' + '<a href="/login">Login page</a>');
	}
});



app.get('/load', function(req, res) {
	var dir = path.join(__dirname, 'notes', req.session.username),
		files = fs.readdirSync(dir);

	var matched = files.filter(function(f) {
			return (
				JSON.parse(
					fs.readFileSync(
						path.join(dir, f),
						'utf-8'
					)
				).name === req.query.name
			);
		})[0];

	if(matched) {
		var obj = JSON.parse(fs.readFileSync(path.join(dir, matched), 'utf-8'));
		obj.id = Number(matched.replace('.json', ''));
		obj.success = true;
		res.json(obj);
	} else {
		var obj = { success: false };
		res.json(obj);
	}
});

app.get('/loadtab', function(req, res) {
	// readfile, send data, 클라이언트에서 분리해서 load
	var tabDataDir = path.join(__dirname, 'notes', req.session.username + '.json'),
		tabData = fs.readFileSync(tabDataDir, 'utf-8');
		res.send(tabData);

});


app.post('/save', function(req, res) {
	var dir = path.join(__dirname, 'notes', req.session.username),
		data = JSON.parse(JSON.stringify(req.body));
		console.log(data);
	data.id = Number(data.id);

	req.session.data = data;
	fs.writeFileSync(path.join(dir, data.id + '.json'), JSON.stringify(data, null, 4), 'utf-8');
	res.send('success');
});


app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/static', 'login.html'));
});


app.post('/login', function(req, res) {
	var data = JSON.parse(JSON.stringify(req.body));
	var uname = data.username;
	var pwd = data.password;

	// ///// 로그인 했을때 세션에 맞는 세션 파일 불러 오기!

	for(var j=0; j<user.length; j++) {
		var users = user[j];
		if(uname === users.username && pwd === users.password) {
			req.session.uid = users.uid;
			req.session.username = uname;
			res.redirect('/');
		} else if (uname === users.username && pwd !== users.password) {
			// res.send('false');
			res.send('Please login ' + '<a href="/login">Login page</a>');
		}
	}
});


// app.get('/logout', function(req, res) {
//     req.session.destroy();
// 	res.redirect('/');
// 	// req.session = null;
// 	// return req.session.save(function() {
// 	// 	res.redirect('/');
// 	// });
//
// });


app.post('/logout', function(req, res) {
	var dir = path.join(__dirname, 'notes'),
		data = JSON.parse(JSON.stringify(req.body));

	/// write note info file ///
	if(req.session.username !== undefined) {
		fs.writeFileSync(path.join(dir, req.session.username + '.json'), JSON.stringify(data, null, 4), 'utf-8');
	}

	req.session.destroy(function() {
		res.redirect('/');
	});

});

var server = app.listen(8080, function () {
	console.log('Server started!');
});
