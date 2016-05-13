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
    email: {
		type: Sequelize.STRING
	}
});

var Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    todoname: {
        type: Sequelize.STRING
    },
    duedate: {
        type: Sequelize.DATE
    },
    important: {
        type: Sequelize.ENUM,
        values: ['low', 'middle', 'high']
    },
    userid: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: { model: User, key: 'userid'}
    }
});

User.hasMany(Todo, { foreignKey: 'userid'});
sequelize.sync({force: true});

/////// Router
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});





///////
var server = app.listen(8080, function () {
	console.log('Server started!');
});




//
// app.get('/load', function(req, res) {
// 	var user = req.session.username;
//     var userid = req.session.userid;
//     var Onenotename = req.query.name;
//
// 	Note.findOne({
// 		where: {
// 			userid: userid,
// 			name: Onenotename
// 		},
// 		attributes: ['id', 'name', 'content']
// 	}).then(function(result) {
// 		result.updateAttributes({
// 			tabopen: true
// 		}).then(function(result) {
// 			res.json(result);
// 		});
//     });
// });
//
//
// app.post('/save', function(req, res) {
// 	if (req.session.username) {
// 		var data = JSON.parse(JSON.stringify(req.body));
// 		data.id = Number(data.id);
//
// 		Note.findOne({
// 			where: {
// 				id: data.id
// 			}
// 		}).then(function(result) {
// 			result.updateAttributes({
// 				name: data.name,
// 				content: data.content,
// 				tabopen: true
// 			});
// 	    });
// 		res.send('success');
// 	}
// });
//
//
// app.post('/addtab', function(req, res) {
// 	var data = JSON.parse(JSON.stringify(req.body));
// 	data.id = Number(data.id);
//
// 	Note.findOne({
// 		where: {
// 			id: data.id,
// 			name: data.name
// 		},
// 		attributes: ['id', 'name', 'content']
// 	}).then(function(result) {
// 		if (result !== null) {
// 			result.updateAttributes({
// 				tabopen: true
// 			}).then(function(result) {
// 				res.json(result);
// 			});
// 		} else if (result == null) {
// 			Note.create({
// 				id: data.id,
// 				name: data.name,
// 				content: data.content,
// 				userid: req.session.userid,
// 				tabopen: true
// 			});
// 			res.send('good');
// 		}
//     });
//
// });
//
// app.get('/closetab', function(req, res) {
//
// 	//  tab name == New tab 이면 delete
// 	var tabid = req.query.id;
// 	Note.findOne({
// 		where: {
// 			id: tabid
// 		}
// 	}).then(function(result) {
//
// 		if (result !== null) {
// 			result.updateAttributes({
// 				tabopen: false
// 			});
// 		}
// 		res.send('success');
// 	});
// });
//
//
// //Join
// app.post('/join', function(req, res) {
// 	var sha2pwd = crypto.createHash('sha256').update(req.body.password).digest('base64');
// 	User.create({
//         username: req.body.username,
//         password: sha2pwd
//     }).then(function(result) {
// 		req.session.username = result.username;
// 		req.session.userid = result.userid;
// 		req.session.save(function() {
// 			res.redirect('/');
// 		});
//     });
// });
//
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
//
// app.post('/login', function(req, res) {
// 	var data = JSON.parse(JSON.stringify(req.body));
// 	var uname = data.username;
// 	// var pwd = data.password;
// 	var sha2pwd = crypto.createHash('sha256').update(data.password).digest('base64');
// 	User.findOne({
//         where: {username: uname},
//         attributes: ['username', 'password', 'userid']
//     }).then(function(result) {
//         if(result) {
//             if(result.password == sha2pwd) {
//                 req.session.username = result.username;
//                 req.session.userid = result.userid;
// 				req.session.save(function() {
// 					res.redirect('/');
// 				});
//             } else {
//                 // username is right but pwd is wrong.
// 				res.redirect('/');
//             }
//         } else {
//             // username is wrong.
// 			res.redirect('/');
//         }
//         // res.redirect('/');
//     });
// });
//
// app.post('/logout', function(req, res) {
// 	req.session.destroy(function() {
// 		res.redirect('/');
// 	});
//
// });
//
//
// var server = app.listen(8080, function () {
// 	console.log('Server started!');
// });
