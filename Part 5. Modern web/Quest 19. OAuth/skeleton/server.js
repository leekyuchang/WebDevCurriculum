var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
	crypto = require('crypto'),
	google = require('googleapis'),
	OAuth2Client = google.auth.OAuth2,
	plus = google.plus('v1'),
	readline = require('readline');
	app = express();


// var CLIENT_ID = '1096402756754-sg32a9hupi805a0fic6f3mslafrhmr8j.apps.googleusercontent.com';
// var CLIENT_SECRET = 'lAM8Jda8nc0Cj0zNy-nVudQK';
// var REDIRECT_URL = 'http://localhost:8080/oauth2callback';

var secreteData = JSON.parse(fs.readFileSync(path.join(__dirname, '/secrete/secrete.json'), 'utf-8'));
var CLIENT_ID = secreteData.CLIENT_ID;
var CLIENT_SECRET = secreteData.CLIENT_SECRET;
var REDIRECT_URL = secreteData.REDIRECT_URL;

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

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
    },
	email: {
		type: Sequelize.STRING
	}
});

var Note = sequelize.define('note', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
	tabopen: {
		type: Sequelize.BOOLEAN, allowNull: false, default: false
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


//////////
app.get('/googlelogin', function(req, res) {
	// generate consent page url
	var url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/userinfo.email',
		approval_prompt: 'auto',

	});
	res.redirect(url);
});


app.get('/oauth2callback', function(req, res) {
	var code = req.query.code;
	//console.log(code);
	var username, useremail, accesstoken;
	oauth2Client.getToken(code, function(err, tokens){
		if (err) {res.send(err)};
		var token = JSON.parse(JSON.stringify(tokens));
		accesstoken = token.access_token;
		console.log('accessToken: ' + accesstoken);
		oauth2Client.setCredentials(tokens);

		plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
			if (err) {
				return console.log('An error occured', err);
			}
			console.log('profile.email: ' + profile.emails[0].value + ' name: ' + profile.name.familyName);
			var profiles = JSON.parse(JSON.stringify(profile));
			username = profiles.name.familyName;
			useremail = profiles.emails[0].value;

			User.findOne({
		        where: {username: username, email: useremail},
		        attributes: ['username']
		    }).then(function(result) {
				if (result !== null) {
					req.session.username = result.username;
					req.session.userid = result.userid;
					// Already Existed UserName, Redirect ('/')
					req.session.save(function() {
						res.redirect('/');
					});
				} else {
					// console.log(username, useremail);
					console.log(typeof username, typeof useremail);
					// No Existed UserName, Create ID
					User.create({
					    username: username,
						email: useremail
					}).then(function(result) {
						req.session.username = result.username;
						req.session.userid = result.userid;
						req.session.save(function() {
							res.redirect('/');
						});
					});
					//
				}
			});
		});
	});



	// Save session, db
	// accessToken
	// profile.emails[0].value
	// profile.name.familyName


	// //res.sendFile(path.join(__dirname, 'static/index.html'));
});
//////////


app.get('/load', function(req, res) {
	var user = req.session.username;
    var userid = req.session.userid;
    var Onenotename = req.query.name;

	Note.findOne({
		where: {
			userid: userid,
			name: Onenotename
		},
		attributes: ['id', 'name', 'content']
	}).then(function(result) {
		result.updateAttributes({
			tabopen: true
		}).then(function(result) {
			res.json(result);
		});
    });
});


app.post('/save', function(req, res) {
	if (req.session.username) {
		var data = JSON.parse(JSON.stringify(req.body));
		data.id = Number(data.id);

		Note.findOne({
			where: {
				id: data.id
			}
		}).then(function(result) {
			result.updateAttributes({
				name: data.name,
				content: data.content,
				tabopen: true
			});
	    });
		res.send('success');
	}
});


app.post('/addtab', function(req, res) {
	var data = JSON.parse(JSON.stringify(req.body));
	data.id = Number(data.id);

	Note.findOne({
		where: {
			id: data.id,
			name: data.name
		},
		attributes: ['id', 'name', 'content']
	}).then(function(result) {
		if (result !== null) {
			result.updateAttributes({
				tabopen: true
			}).then(function(result) {
				res.json(result);
			});
		} else if (result == null) {
			Note.create({
				id: data.id,
				name: data.name,
				content: data.content,
				userid: req.session.userid,
				tabopen: true
			});
			res.send('good');
		}
    });

});

app.get('/closetab', function(req, res) {

	//  tab name == New tab 이면 delete
	var tabid = req.query.id;
	Note.findOne({
		where: {
			id: tabid
		}
	}).then(function(result) {

		if (result !== null) {
			result.updateAttributes({
				tabopen: false
			});
		}
		res.send('success');
	});
});


//Join
app.post('/join', function(req, res) {
	var sha2pwd = crypto.createHash('sha256').update(req.body.password).digest('base64');

	User.findOne({
        where: {username: req.body.username},
        attributes: ['username']
    }).then(function(result) {
		if (result !== null) {

			// Already Existed UserName, Redirect ('/')
			res.redirect('/');
		} else {

			// No Existed UserName, Create ID
			console.log(typeof req.body.username);
			User.create({
			    username: req.body.username,
			    password: sha2pwd
			}).then(function(result) {
				req.session.username = result.username;
				req.session.userid = result.userid;
				req.session.save(function() {
					res.redirect('/');
				});
			});
			//
		}
	});
});

// Login check
app.get('/logined', function(req, res) {
	if (req.session.username) {
		var userid = req.session.userid;
		// tab data뿌리기
		Note.findAll({
			where: {
				userid: userid,
				tabopen: true
			}
		}).then(function(result) {
			res.json(result);
		});
	} else {
		res.send('false');
	}
});

app.post('/login', function(req, res) {
	var data = JSON.parse(JSON.stringify(req.body));
	var uname = data.username;
	// var pwd = data.password;
	var sha2pwd = crypto.createHash('sha256').update(data.password).digest('base64');
	User.findOne({
        where: {username: uname},
        attributes: ['username', 'password', 'userid']
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
