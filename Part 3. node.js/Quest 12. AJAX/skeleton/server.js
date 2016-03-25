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

// Edit note form send
app.post('/notes/:notename', function(req, res) {
	var a, b;
    var i;
    var obj;
    /////find same name in json & form function
    function checkExistName(array, name) {
        for(i = 0; i < array.length; i += 1) {
            if(array[i].name == name) {
                a = 1;
				b = i;
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
			checkExistName(obj, req.body.name);
			if(req.body.btn == "newsub") {   /// New note submit
	            if(a === 1) {  // 'Already existed notename'
	                console.log('exist name');
					res.send('Already');
	            } else {      // 추가
	                console.log('no exist name');
					delete req.body.btn;
	                obj.push(req.body);
					var jsonobj = JSON.stringify(obj, null, 4);
		            fs.writeFile(__dirname + '/client/test.json', jsonobj, function(err) {
		                if (err) {
		                    console.log(err);
		                }
		            });
					res.send('good');
	            }
			} else if (req.body.btn == "mainsub") {   /// List note edit submit

				//// 여기서  i를 따로 넘기나?
				if(a === 1) {  // 이름 같아서 contents 수정
	                console.log('exist name');
	                obj[b].contents = req.body.contents;
					var jsonobj = JSON.stringify(obj, null, 4);
					fs.writeFile(__dirname + '/client/test.json', jsonobj, function(err) {
					    if (err) {
					        console.log(err);
					    }
					});
					res.send('good');
	            } else {

					/// 기존에 있는 이름으로 바뀔때는??
					 
	                console.log('different note name');
					res.send('diff');
					// delete req.body.btn;  // req.body.btn 제외하고
					// console.log(req.body);
					// console.log(b);
					// 여기서 어떻게 req.body.name 을 가져오지????
					/////이름만 바꾸면 되네 지우지 않고

					// var changed = obj.splice(i, 1, req.body);
					// console.log("This is changed " + changed);
					// // obj.splice(i, 1, req.body);  // 기존의 obj[i]는 지우고   왜 안지워지지???????????????
					// // obj.push(req.body);
	            }

			}
        }
    });
});

// NEW Note FORM SEND
app.post('/edit', function(req, res) {
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
				// req.body.btn 제외하고
				delete req.body.btn;
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


var server = app.listen(8080, function () {
	console.log('Server started!');
});
