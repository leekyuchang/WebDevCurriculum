var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');


app.use(express.static(__dirname));

// var rooms = [];
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
	console.log(rooms);
});


io.on('connection', function(socket){
	socket.on('join', function(data) {
        console.log(data);
    });

	socket.on('joinroom', function(data) {
		socket.join(data.roomnum); //join room
		// var roomnum = data.roomnum;
		// if (rooms[roomnum] == undefined) {
        //     rooms[roomnum] = new Object();  // create Object(room) in Rooms Array
		// 	rooms[roomnum].id;
        // }

	});

	socket.on('createShape', function(data) {
		socket.broadcast.to(data.roomnum).emit('create', data);
	});

	socket.on('selectedShape', function(data) {
		socket.broadcast.to(data.roomnum).emit('select', data.nums);
	});

	socket.on('unselectedShape', function(data) {
		socket.broadcast.to(data.roomnum).emit('unselect', data);
	});

	socket.on('moveShape', function(data) {
		socket.broadcast.to(data.roomnum).emit('move', data);
	});

});

http.listen(8080, function () {
	console.log('Server started!');
});
