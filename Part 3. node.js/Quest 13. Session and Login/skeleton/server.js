var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	// cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser');
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
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
	res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.get('/load', function(req, res) {

	/// push하기
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


app.post('/save', function(req, res) {
	var dir = path.join(__dirname, 'notes', req.session.username),
		data = JSON.parse(JSON.stringify(req.body));
		console.log(data);
	data.id = Number(data.id);
	req.session.data = data;
	fs.writeFileSync(path.join(dir, data.id + '.json'), JSON.stringify(data, null, 4), 'utf-8');
	res.send('success');
});

// app.post('/newtab', function(req, res) {
// 	var tabDataDir = path.join(__dirname, 'notes', req.session.username + '.json'),
// 	tabData = fs.readFileSync(tabDataDir, 'utf-8');
// 	res.send(tabData);
// });

app.get('/logined', function(req, res) {
	// 탭도 체크하기
	if (req.session.username) {
		var tabDataDir = path.join(__dirname, 'notes', req.session.username + '.json'),
		tabData = fs.readFileSync(tabDataDir, 'utf-8');
		res.send(tabData);

	} else {
		res.send('false');
	}
});

app.post('/login', function(req, res) {
	var data = JSON.parse(JSON.stringify(req.body));
	var uname = data.username;
	var pwd = data.password;

	for(var j=0; j<user.length; j++) {
		var users = user[j];
		if(uname === users.username && pwd === users.password) {
			req.session.username = uname;
			req.session.save(function() {
				res.redirect('/');
			});
		} else if (uname === users.username && pwd !== users.password) {
			res.send('false');
		}
	}
});

app.post('/logouted', function(req, res) {
	var dir = path.join(__dirname, 'notes'),
		data = JSON.parse(JSON.stringify(req.body));
	console.log(data);

	if(req.session.username !== undefined) {
		fs.writeFileSync(path.join(dir, req.session.username + '.json'), JSON.stringify(data, null, 4), 'utf-8');
		console.log('server: logout');
	}
});


app.post('/logout', function(req, res) {
	req.session.destroy(function() {
		// res.clearCookie('username');
		res.redirect('/');
	});

});

var server = app.listen(8080, function () {
	console.log('Server started!');
});


// 새로고침할때랑 로그인 할때를 나눠야하는지
// new버튼이나 closetab버튼 눌렀을때도 서버에 보내서 로그인/새로고침할때 불러오는건지
