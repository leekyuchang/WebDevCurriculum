var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/new', function(req, res) {
	////// read form ?????
	// form은 clone인데
	// 이것을 바꾸어야 하는지
});

// NOTES LIST
app.get('/main', function(req, res) {
	var obj;
	fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
		} else {
			// 사용자의 ID, 노트의 개수, 리스트
			var str = JSON.parse(data);
			res.send(str); // data는 json but ajax의 xhr.responseText가 string으로 만든다.
		}
	});
});

// NOTES LOAD
app.get('/notes/:notename', function(req, res) {
	// 이름, 내용
	// Edit Button  -- 미정
	console.log('This is ' + req.params.notename + 'note');
	fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
		} else {
			// 이름, 내용
			var str = JSON.parse(data);
			// notename의 data만 send하기.
			for(var i = 0; i < str.length; i += 1) {
				if(str[i].name == req.params.notename) {
					res.send(str[i]);
				}
			}
		}
	});
});

// NEW Note FORM SEND
app.post('/new', function(req, res) {
	var a;
	    var i;
	    var obj;
	    /////find same name in json & form function
	    function checkExistName(array, name) {
	        for(i = 0; i < array.length; i += 1) {
	            if(array[i].name === name) {
	                a = 1;
	                return i;
	            }
	        }
	    }

	    // form to json save or modify
	    console.log(req.body);
	    fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
	        if(err) {
	            console.log(err);
	        } else {
	            obj = JSON.parse(data); //objects in array
	            // check exist name in object array (JSON -> object)
	            checkExistName(obj, req.body.name);
	            if(a === 1) {  // 'Already existed notename'
	                console.log('exist name');
	                // obj[i].contents = req.body.contents;
					res.send('Already');
	            } else {      // 추가
	                console.log('no exist name');
	                obj.push(req.body);
					var jsonobj = JSON.stringify(obj, null, 4);
		            fs.writeFile(__dirname + '/client/test.json', jsonobj, function(err) {
		                if (err) {
		                    console.log(err);
		                }
		            });
					res.send('Good');
	            }
	        }
	    });
});

// Edit note form send
app.post('/edit', function(req, res) {
	var a = 0;
	    var i;
	    var obj;
	    /////find same name in json & form function
	    function checkExistName(array, name) {
	        for(i = 0; i < array.length; i += 1) {
	            if(array[i].name == name) {
	                a = 1;
	                return i;
	            }
	        }
	    }

	    // form to json save or modify
	    console.log(req.body);
	    fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
	        if(err) {
	            console.log(err);
	        } else {
	            obj = JSON.parse(data); //objects in array
	            // check exist name in object array (JSON -> object)
	            checkExistName(obj, req.body.name)
	            if(a === 1) {  // 수정
	                console.log('exist name');
	                obj[i].contents = req.body.contents;
	            } else {      // 추가
	                console.log('no exist name, change the name');
					obj[j].name = req.body.name;
					obj[i].contents = req.body.contents;
					// obj.push(req.body);
	            }
	            var jsonobj = JSON.stringify(obj, null, 4);
	            fs.writeFile(__dirname + '/client/test.json', jsonobj, function(err) {
	                if (err) {
	                    console.log(err);
	                }
	            });
	        }
	    });
});


var server = app.listen(8080, function () {
	console.log('Server started!');
});
