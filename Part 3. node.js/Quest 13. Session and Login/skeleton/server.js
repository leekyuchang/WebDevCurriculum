var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	bodyParser = require('body-parser');
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'static/index.html'));
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

var server = app.listen(8080, function () {
	console.log('Server started!');
});
