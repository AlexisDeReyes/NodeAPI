var Returner = exports;

Returner.Return = function(response, status, message, headers){
	if(typeof(message) == 'string' || message == null){
		response.writeHead(status, headers);
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