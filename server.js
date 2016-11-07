var express = require('express');
var moment = require('moment');

var app = express();

app.get('/:string', function(req, res) {
	var data = req.params.string;
	var datafixed = data.replace(/\W+/g, "-");	
	var check = datafixed.split("-");
	var unixDate = null;
	var naturalDate = null;

	if (check.length === 1) {
		unixDate = datafixed;
		naturalDate = moment.unix(parseInt(datafixed)).format('MMMM D, YYYY');
	} else if (check.length > 1 && moment(datafixed).isValid()) {		
		var date = moment(datafixed, 'MMMM-DD-YYYY');
		unixDate = date.format('X');
		naturalDate = date.format("MMMM D, YYYY");		
	}

	if (data) {
		res.json({
			unix: unixDate,
			natural: naturalDate
		});
	} else {
		res.status(404).send();
	}
});

app.listen(8080, function() {
	console.log('Listening on port 8080.')
})