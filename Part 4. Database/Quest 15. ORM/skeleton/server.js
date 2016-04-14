var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
    Sequelize = require('sequelize');
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret : '!@#asdf!@#gre',
	resave : true,
	saveUninitialized : false
}));

app.use('/static', express.static('static'));

var sequelize = new Sequelize('test', 'root', '1111', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
    }, function (err) {
    console.log('Unable to connect to the database:', err);
});

var User = sequelize.define('user', {
    userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

var Note = sequelize.define('note', {
    noteid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    notename: {
        type: Sequelize.STRING
    },
    contents: {
        type: Sequelize.STRING
    },
	tabsave: {
		type: Sequelize.BOOLEAN
	},
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: User, key: 'userid'}
    }
});

User.hasMany(Note, { foreignKey: 'userid'});
sequelize.sync({force: true});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.get('/load', function(req, res) {
	// var dir = path.join(__dirname, 'notes', req.session.username),
	// 	files = fs.readdirSync(dir);
	//
	// var matched = files.filter(function(f) {
	// 		return (
	// 			JSON.parse(
	// 				fs.readFileSync(
	// 					path.join(dir, f),
	// 					'utf-8'
	// 				)
	// 			).name === req.query.name
	// 		);
	// 	})[0];
	//
	// if(matched) {
	// 	var obj = JSON.parse(fs.readFileSync(path.join(dir, matched), 'utf-8'));
	// 	obj.id = Number(matched.replace('.json', ''));
	// 	obj.success = true;
	// 	res.json(obj);
	// } else {
	// 	var obj = { success: false };
	// 	res.json(obj);
	// }
});


app.post('/save', function(req, res) {
	if (req.session.username) {
		var data = JSON.parse(JSON.stringify(req.body));
		data.id = Number(data.id);
		Note.create({
			noteid: data.id,
			notename: data.name,
			contents: data.content,
			userid: req.session.userid
		}).then(function() {
			res.redirect('/');
		});
	}
	// var dir = path.join(__dirname, 'notes', req.session.username),
	// 	data = JSON.parse(JSON.stringify(req.body));
	// data.id = Number(data.id);
	// // req.session.data = data;
	// fs.writeFileSync(path.join(dir, data.id + '.json'), JSON.stringify(data, null, 4), 'utf-8');
	// res.send('success');
});

app.post('/tabsave', function(req, res) {
	// if (req.session.username !== undefined) {
	// 	var dir = path.join(__dirname, 'notes'),
	// 	data = JSON.parse(JSON.stringify(req.body));
	// 	console.log(data);
	// 	fs.writeFileSync(path.join(dir, req.session.username + '.json'), JSON.stringify(data, null, 4), 'utf-8');
	// 	res.send('good');
	// }
});


//Join
app.post('/join', function(req, res) {
	User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function() {
		req.session.username = req.body.username;
        res.redirect('/');
    });
});

// Login
app.get('/logined', function(req, res) {
	if (req.session.username) {
		// tab data뿌리기

		// var tabDataDir = path.join(__dirname, 'notes', req.session.username + '.json'),
		// tabData = fs.readFileSync(tabDataDir, 'utf-8');
		// res.send('tabData');
		res.send('true');

	} else {
		res.send('false');
	}
});

app.post('/login', function(req, res) {
	var data = JSON.parse(JSON.stringify(req.body));
	var uname = data.username;
	var pwd = data.password;

	User.findOne({
        where: {username: uname},
        attributes: ['username', 'password', 'userid']
    }).then(function(result) {
        if(result) {
            if(result.password === pwd) {
                req.session.username = result.username;
                req.session.userid = result.userid;
				req.session.save(function() {
					res.redirect('/');
				});
            } else {
                // username is right but pwd is wrong.
				res.redirect('/');
            }
        } else {
            // username is wrong.
			res.redirect('/');
        }
        // res.redirect('/');
    });
});

app.post('/logout', function(req, res) {
	req.session.destroy(function() {
		res.redirect('/');
	});

});

var server = app.listen(8080, function () {
	console.log('Server started!');
});
