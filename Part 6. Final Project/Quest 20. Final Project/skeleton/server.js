var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
	crypto = require('crypto');
	app = express();


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret : '!@#asdf!@#gre',
	resave : true,
	saveUninitialized : false
}));

var sequelize = new Sequelize('calendar', 'root', '1111', {
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
    },
    useremail: {
		type: Sequelize.STRING
	}
});

var Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
		autoIncrement: true
    },
    todoname: {
        type: Sequelize.STRING
    },
    duedate: {
        type: Sequelize.DATE
    },
    // important: {
    //     type: Sequelize.ENUM,
    //     values: ['low', 'middle', 'high']
    // },
    userid: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'userid'}
    }
});

User.hasMany(Todo, { foreignKey: 'userid'});
sequelize.sync({force: true});

/////// Router
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

//addtodo
app.post('/addtodo', function(req, res) {
	if(req.session.username) {
		var uname = req.session.username;
		var uid = req.session.userid;
		var data = req.body;
		var todo = data.todoname;

		Todo.create({
			userid: uid,
			todoname: todo
		}).then(function(result) {
			res.json(result.todoname);
			// res.send('addtodo');
		});
	}
});

// deletetodo  // delete
app.delete('/deletetodo/:todoname', function(req, res) {
	if(req.session.username) {
		var todoname = req.params.todoname;
		var uid = req.session.userid;
		var uname = req.session.username;

		Todo.destroy({
			where: {
				todoname: todoname,
				userid: uid
			}
		}).then(function(result) {
			res.json(result);
		});
	}
});

//addtododate  // update
app.put('/todo/:todoname/:duedate', function(req, res) {
	if(req.session.username) {
		var todoname = req.params.todoname;
		var duedate = req.params.duedate;
		var uid = req.session.userid;
		var uname = req.session.username;

		Todo.findOne({
			where: {
				todoname: todoname,
				userid: uid
			},
			attributes: ['id', 'todoname', 'duedate', 'userid']
		}).then(function(result) {
			result.updateAttributes({
				duedate: duedate
			}).then(function(update) {
				res.json(update);
			});
		});
	}
});

// login
app.post('/login', function(req, res) {
	var data = req.body;
	var uname = data.username;
	var sha2pwd = crypto.createHash('sha256').update(data.password).digest('base64');

	User.findOne({
		where: {
			username: uname,
		},
		attributes: ['username', 'password', 'userid', 'useremail']
	}).then(function(result) {
		if(result) {
			if(result.password == sha2pwd) {
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
	});
});

// join
app.post('/join', function(req, res) {
	if(!req.session.username) {
		var data = req.body;
		var uname = data.username;
		var email = data.useremail;
		var sha2pwd = crypto.createHash('sha256').update(data.password).digest('base64');

		User.findOrCreate({
			where: {
				username: uname
			},
			defaults: {
				password: sha2pwd,
				useremail: email
			}
		}).spread(function(result, created) {

			if(created === true) {
				// created === true
				req.session.username = result.username;
				req.session.userid = result.userid;
				req.session.save(function() {
					res.redirect('/');
				});
			} else {
				// res.json(result);
				// created === false
				res.send("false");
			}
        });
	} else {
		res.redirect('/');
	}
});

// logined
app.get('/logincheck', function(req, res) {
	if(req.session.username) {
		res.send("true");
	} else {
		res.send("false");
	}
});

// logout
app.get('/logout', function(req, res) {
	if(req.session.username) {
		req.session.destroy(function() {
			res.redirect('/');
		});
	} else {
		res.redirect('/');
	}
});


///////
var server = app.listen(8080, function () {
	console.log('Server started!');
});





// // Login check
// app.get('/logined', function(req, res) {
// 	if (req.session.username) {
// 		var userid = req.session.userid;
// 		// tab data뿌리기
// 		Note.findAll({
// 			where: {
// 				userid: userid,
// 				tabopen: true
// 			}
// 		}).then(function(result) {
// 			res.json(result);
// 		});
// 	} else {
// 		res.send('false');
// 	}
// });
