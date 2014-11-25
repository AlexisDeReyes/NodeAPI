var Handlers = exports;
var store = require('jfs');

var db = new store("data");
var id = 0;



Handlers.user = {
	get: function(response, resource){
		console.log('Retrieving User Data'.yellow);
		db.get(resource, function(err, obj){
			if(!err){
				Return(response, 201, obj);
			}
			else{
				console.error(err);
				console.error('failed to retrieve user');
				Return(response, 404, 'user ' + resource + ' not found');
			}
		});
	},
	post: function(response, postData){
		console.log('Creating User Data'.magenta);
		db.save(postData.name, postData, function(err){
			if(!err){
				Return(response, 201, 'created user: ' + postData.name);
			}
			else{
				console.error('failed to save user');
				console.error(err);
				Return(response, 500, err);
			}	
			
		})
		
	}
}

Handlers.default = function(response){
	response.writeHead(200);
	response.end('Hello htp');
}


function Return(response, status, message){
	if(typeof(message) == 'string'){
		response.writeHead(status);
		response.end(message);	
	}
	else{
		response.writeHead(status, jsonType);
		response.end(JSON.stringify(message));
	}
}

var jsonType = {
	'Content-Type': 'application/json'
}
