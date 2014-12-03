var logger = exports;
var colors = require('colors');

logger.Error = function(message, error){
	console.log(message.red);
	if(error)
		console.log(error.toString().red);
};