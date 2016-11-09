var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var bodyParser = require('body-parser');
var calculateDate = require('./calculate-date')

var globalString = '';
var globalUnixDate = '';
var globalNaturalDate = '';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// get route, rendering the results to the template
app.get('/', function(req, res) {	
	res.render("index", {
		passedString: globalString,
		passedUnix: globalUnixDate,
		passedNatural: globalNaturalDate
	});
});

// post route, receiving the form input string and calculating the date
app.post('/results', function(req, res) {
	
	var reqData = req.body.stringFromForm;
	
	var results = calculateDate(reqData);

	globalUnixDate = results.unixOut;
	globalNaturalDate = results.naturalOut;

	res.redirect('/');	
});

app.listen(PORT, process.env.IP, function(){
    console.log('Server started on port', PORT);
})