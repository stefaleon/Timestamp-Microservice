var moment = require('moment');

var calculateDate = function(data){

	var datafixed = '';
	var check = ['a'];

	var globalString = data; //to start with, testing purposes
	console.log(data);

	// check for negative single number
	if ( (data.split(""))[0] === "-" && (data.split(" ")).length === 1  ){
		datafixed = data;
	} else {
		// otherwise clear the string from trash chars
		datafixed = data.replace(/\W+/g, "-");	
		check = datafixed.split("-");
	}
		
	var unixDate = null;
	var naturalDate = null;

	console.log(check.length);


	if (check.length === 1) {
		date = moment.unix(parseInt(datafixed)).format('MMMM-DD-YYYY');
		if (moment(date).isValid()){
			unixDate = datafixed;
			naturalDate = moment(date).format("MMMM D, YYYY");
		}		
	} else if (check.length ===3) {

		var month = 0;
		var year = 0;
		var day = 0;		

		if  ( !isNaN(check[0]) && !isNaN(check[1]) && !isNaN(check[2]) ){
			for(var i=0; i<3; i++){
				if (check[i]>31){
					console.log('i: '+ i +', year may be '+ check[i] );
					year = check[i];
				}
				if (check[i]<13 && month === 0){
					console.log('i: '+ i +', month may be '+ check[i] );
					month = check[i];
				}
				else if (check[i]<32) {
					console.log('i: '+ i +', day may be '+ check[i] );
					day = check[i];
				}				
			}

			var newDateString = month + '-' + day + '-' + year ; 
			console.log(newDateString);
			
			if (moment(newDateString).isValid()){
				var date = moment(newDateString, 'M-DD-YYYY');
				unixDate = date.format('X');
				naturalDate = date.format("MMMM D, YYYY");	
			}

		} else {	
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
					console.log('i: '+ i +', day may be '+ check[i] );
					day = check[i];
				}
			}

			var newDateString = month + '-' + day + '-' + year ; 
			console.log(newDateString);
			
			if (moment(newDateString).isValid()){
				var date = moment(newDateString, 'MMMM-DD-YYYY');
				unixDate = date.format('X');
				naturalDate = date.format("MMMM D, YYYY");	
			}
		}						
	}

	return { unixOut : unixDate, naturalOut: naturalDate };

}

module.exports = calculateDate;