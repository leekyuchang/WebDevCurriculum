var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	session = require('express-session'),
	bodyParser = require('body-parser');
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret : '!@#asdf!@#gre',
	resave : false,
	saveUninitialized : true
}));

app.use('/static', express.static('static'));


app.get('/', function (req, res) {
	if(req.session.username) {
        console.log('logined');
		res.sendFile(path.join(__dirname, 'static/index.html'));
        // res.send('<a href="/logout">logout</a>');
    } else {
        res.send('You should login. ' + '<a href="/login">login</a>');
    }
});


app.get('/load', function(req, res) {
	var dir = path.join(__dirname, 'notes'),
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
	var dir = path.join(__dirname, 'notes'),
		data = JSON.parse(JSON.stringify(req.body));

	data.id = Number(data.id);

	fs.writeFileSync(path.join(dir, data.id + '.json'), JSON.stringify(data, null, 4), 'utf-8');
	res.send('success');
});


app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/static', 'login.html'));
});


app.post('/login', function(req, res) {
	var a = 0;
	var i;
	var uname = req.body.username;
	var pwd = req.body.password;
	var user = [
		{
			username : 'test1',
			password : 'test1'
		},
		{
			username : 'test2',
			password : 'test2'
		},
		{
			username : 'test3',
			password : 'test3'
		}
	];

	function checkExistName(array, name, password) {
        for(i = 0; i < array.length; i += 1) {
            if(array[i].username === name && array[i].password === password) {
                a = 1;
				// return i;
            }
        }
    }

    checkExistName(user, uname, pwd);

    if(a === 1) {
        // req.session.logined = true;
		req.session.username = uname;
        res.redirect('/');
    } else {
        res.send('you"re not member' + '<a href="/login">back</a>');
    }
});


app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

var server = app.listen(8080, function () {
	console.log('Server started!');
});
