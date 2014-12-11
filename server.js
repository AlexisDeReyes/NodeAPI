var http = require('http');
var route = require('./router').route;
var logger = require('./logger');
var Return = require('./returner').Return;

var server = http.createServer(function(request, response, next){
	if(request.method == 'OPTIONS'){
		var headers = {};
	    headers["Access-Control-Allow-Origin"] = "*";
	    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	    headers["Access-Control-Allow-Credentials"] = true;
	    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    	Return(response, 204, null, headers);
	}
	else if(request.method == 'POST' || request.method == 'PUT')
		RetreiveBodyThenRoute(request, response, route);
	else
		route(request, response);
});
server.listen(8080);

console.log('Server started on port 8080');


function RetreiveBodyThenRoute(request, response, route){
	var body = '';

	request.addListener('data', function(chunk){
		body += chunk;
	});

	request.addListener('error', function(error){
		console.error('got an error', error);
		next(err);
	});

	request.addListener('end', function(chunk){
		if (chunk) {
			body += chunk;
		}
		try{
	  		var postData = JSON.parse(body);
		} 
		catch(e){
			logger.Error('failed to parse json', e);
			Return(response, 400, 'failed to parse json request');
		}
		if(postData){
	  		route(request, response, postData);
		}
	});
}