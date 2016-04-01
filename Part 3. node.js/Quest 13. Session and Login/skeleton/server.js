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
	saveUninitialized : false,   // false일때 new노트 저장하면 session에 덮어쓰기 된다.
	// cookie : {
	// 	maxAge: 6000000
	// }
}));

app.use('/static', express.static('static'));



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'static/index.html'));
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
	var a = 0;
	var i;
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

	function checkExistName(array, name, password) {
        for(i = 0; i < array.length; i += 1) {
            if(array[i].username === name && array[i].password === password) {
                a = 1;
				return i;
            }
        }
    }

    checkExistName(user, uname, pwd);

	///// 로그인 했을때 세션에 맞는 세션 파일 불러 오기!

	console.log(a);
    if(a == 1) {
		///// 세션 로그인
		req.session.uid = user[i].uid;
		req.session.username = uname;
		res.send('logined');
        // res.redirect('/');
    } else {
		res.send('Please login ' + '<a href="/login">Login page</a>');
    }
});


app.get('/logout', function(req, res) {
    // req.session.destroy();
	req.session = null;
    res.redirect('/login');
});

var server = app.listen(8080, function () {
	console.log('Server started!');
});
