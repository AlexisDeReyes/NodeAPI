var http = require('http');
var route = require('./router').route;

var server = http.createServer(function(request, response){
	if(request.method == 'POST')
		RetreiveBodyThenRoute(request, response, route);
	else
		route(request, response);
});
server.listen(8080);



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
	  var postData = JSON.parse(body);
	  route(request, response, postData);
	});
}