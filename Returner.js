var Returner = exports;

Returner.Return = function(response, status, message){
	if(typeof(message) == 'string'){
		response.writeHead(status);
		response.end(message);	
	}
	else{
		response.writeHead(status, jsonType);
		response.end(JSON.stringify(message));
	}
};

var jsonType = {
	'Content-Type': 'application/json'
}