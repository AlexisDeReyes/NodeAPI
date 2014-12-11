var router = exports;
var colors = require('colors');
var handlers = require('./handlers2');
var Return = require('./returner').Return;

var url = require('url');

router.route = function(request, response, body){
	var path = url.parse(request.url).pathname;

	if(NotFaviconRequest(path)){
		console.log(('routing ' + request.method + ' request for ' + path).green);
		RoutingRequestPath(path, request, body, response);
	}
}

function RoutingRequestPath(path, request, body, response){
	
	path = path.substring(1); 

	var pathObject = ParseEndpoint(path);

	if(handlers[pathObject.endpoint]){
		if(request.method == 'POST' && handlers[pathObject.endpoint].post)
			handlers[pathObject.endpoint].post(response, body);
		else if(request.method == 'PUT' && handlers[pathObject.endpoint].put)
			handlers[pathObject.endpoint].put(response, pathObject.resource, body);
		else if(request.method == 'GET' && handlers[pathObject.endpoint].get)
			handlers[pathObject.endpoint].get(response, pathObject.resource);
		else
			Return(response, 404, 'Handler for ' + request.method + ' to path ' + pathObject.endpoint + ' not found');
	}
	else
		handlers['default'](response);
}

function NotFaviconRequest(path, response){
	return path != '/favicon.ico';
}


function ParseEndpoint(path)
{
	var words = path.split('/');

	if(words.length == 1){
		return {
			endpoint: words[0]
		};
	} else if(words.length == 2){
		return {
			endpoint: words[0],
			resource: words[1]
		};
	} else {
		return {
			endpoint: words[0],
			resource: words[1],
			subEndpoint: words[2]
		};
	}
}

