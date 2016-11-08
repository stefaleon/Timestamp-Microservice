var express = require('express');
var moment = require('moment');

var app = express();

app.use(express.static('public'));

app.get('/:string', function(req, res) {
	var data = req.params.string;
	var datafixed = data.replace(/\W+/g, "-");	
	var check = datafixed.split("-");
	var unixDate = null;
	var naturalDate = null;

	console.log(check.length);


	if (check.length === 1) {
		date = moment.unix(parseInt(datafixed)).format('MMMM-DD-YYYY');
		if (moment(date).isValid()){
			unixDate = datafixed;
			naturalDate = moment(date).format("MMMM D, YYYY");
		}		
	} else if (check.length > 1) {
		if (check.length === 3){
			var month = '';
			var year = 0;
			var day = 0;
			for(var i=0; i<3; i++){
				if (isNaN(check[i])){
					console.log('i: '+ i +', month may be '+ check[i] );
					month = check[i];
				}				
				else if (!isNaN (check[i]) && check[i]>31){
					console.log('i: '+ i +', year may be '+ check[i] );
					year = check[i];
				}
				else {
					day = check[i];
				}
			}
		}
		var newDateString = month + '-' + day + '-' + year;
		if (moment(newDateString).isValid()){
			var date = moment(newDateString, 'MMMM-DD-YYYY');
			unixDate = date.format('X');
			naturalDate = date.format("MMMM D, YYYY");	
		}			
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