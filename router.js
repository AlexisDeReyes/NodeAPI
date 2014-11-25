var router = exports;
var colors = require('colors');
var handlers = require('./handler');

var url = require('url');

router.route = function(request, response, body){
	var path = url.parse(request.url).pathname;

	if(NotFaviconRequest(path)){
		console.log(('routing request for ' + path).green);
		RoutingRequestPath(path, request, body, response);
	}
}

function RoutingRequestPath(path, request, body, response){
	
	path = path.substring(1);

	var pathObject = ParseEndpoint(path);

	if(handlers[pathObject.endpoint]){
		if(request.method == 'POST')
			handlers[pathObject.endpoint].post(response, body);
		else
			handlers[pathObject.endpoint].get(response, pathObject.resource);
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
	return {
		endpoint: words[0],
		resource: words[1] 
	};
}

