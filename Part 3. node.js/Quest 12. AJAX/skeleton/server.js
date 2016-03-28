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
			var str = JSON.parse(data);
			res.send(str); // data는 json형태 but ajax의 xhr.responseText가 string으로 만든다.
		}
	});
});

// NOTES LOAD 노트의 이름과 내용을 read하여 클라이언트로 전송
app.get('/notes/:notename', function(req, res) {
	console.log('This is ' + req.params.notename + 'note');
	fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
		} else {
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

// Edit note (form을 작성하여 server로 send)
app.post('/notes/:notename', function(req, res) {
	var a, i;
    var obj;

    // check same name in json & form function
    function checkExistName(array, name) {
        for(i = 0; i < array.length; i += 1) {
            if(array[i].name == name) {
                a = 1;
				return i;
            }
        }
    }

    // form to json save or modify
    fs.readFile(__dirname + '/client/test.json', 'utf8', function(err, data) {
        if(err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //objects in array
			checkExistName(obj, req.body.name);
			// req.body.btnnames는 ajax에서 client의 상황에따라 다르게 적용 하기위한 변수
			if(req.body.btnname == "newsub") {   /// client에서 New note를 만드는 상황 일때
	            if(a === 1) {  // 'Already existed notename'
	                console.log('exist name');
					res.send('Already');
	            } else {      // 노트의 이름이 없어 새로 추가
	                console.log('no exist name');
					delete req.body.btnname;
					// req.body를 배열에 넣고 json으로 변환 저장
	                obj.push(req.body);
					var jsonobj = JSON.stringify(obj, null, 4);
		            fs.writeFile(__dirname + '/client/test.json', jsonobj, function(err) {
		                if (err) {
		                    console.log(err);
		                }
		            });
					res.send('good');
	            }
			} else if (req.body.btnname == "mainsub") {   /// client에서 기존의 노트를 edit하는 상황 일때

				if(a === 1) {  // 이름 같아서 contents를 수정
	                console.log('exist name');
	                obj[i].contents = req.body.contents;
					var jsonobj = JSON.stringify(obj, null, 4);
					fs.writeFile(__dirname + '/client/test.json', jsonobj, function(err) {
					    if (err) {
					        console.log(err);
					    }
					});
					res.send('good');
	            } else { // 이름이 다르면 alert
	                console.log('different note name');
					res.send('diff');
	            }
			}
        }
    });
});

var server = app.listen(8080, function () {
	console.log('Server started!');
});
