var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	// cookieParser = require('cookie-parser'),
	session = require('express-session'),
	// FileStore = require('session-file-store')(session),
	bodyParser = require('body-parser');
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
	// store: new FileStore(),
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
	// if(req.session.username) {
	// 	res.sendFile(path.join(__dirname, 'static/index.html'));
	// } else {
	// 	res.send('Please login ' + '<a href="/login">Login page</a>');
	// }
	// res.sendFile(path.join(__dirname, 'static/index.html'));
	// if(req.session.username) {
	// 	//// 저장된 세션을 불러와야 한다.
	// 	/// tab과 세션들...
	// 	// if(req.session.data) {
	// 	// 	res.send(req.session);
	// 	// 	/// 탭과 내용을 불러오기
	// 	// } else {
	// 	// 	res.sendFile(path.join(__dirname, 'static/index.html'));
	// 	// }
	// 	// console.log(req.session);
	// 	res.sendFile(path.join(__dirname, 'static/index.html'));
	//
    // } else {
	// 	res.send('Please login ' + '<a href="/login">Login page</a>');
    // }
	if(req.session.username) {
		res.sendFile(path.join(__dirname, 'static/index.html'));
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


app.post('/save', function(req, res) {
	var dir = path.join(__dirname, 'notes', req.session.username),
		data = JSON.parse(JSON.stringify(req.body));

	data.id = Number(data.id);

	// if(req.session.data) {
	// 	if (!Array.isArray(req.session.data)) {
	// 		req.session.data = [];
	// 		req.session.data.push(data);
	// 	} else {
	// 		req.session.data.push(data);
	// 	}
	// } else {
	// 	req.session.data = [];
	// 	req.session.data.push(data);
	// }

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
			res.send('true');
			// req.session.save(function() {
			// 	// res.redirect('/');
			// });

		} else if (uname === users.username && pwd !== users.password) {
			res.send('false');
			// res.send('Please login ' + '<a href="/login">Login page</a>');
		}
	}

});


app.get('/logout', function(req, res) {
    req.session.destroy();
	// req.session = null;
	req.session.save(function() {
		res.redirect('/');
	});

});


// app.post('/logout', function(req, res) {
//
// 	/// 로그아웃 할때 탭의 개수와 상태를 파일로 만들기
// 	/// 로그인 할때 파일의 정보를 불러와 이전의 상태를 만들기
// 		req.session.destroy();
// 		req.session.save(function() {
// 			res.redirect('/');
// 		});
//
// });

var server = app.listen(8080, function () {
	console.log('Server started!');
});
