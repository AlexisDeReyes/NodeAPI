var Handlers = exports;
var store = require('jfs');
var Logger = require('./logger');
var Return = require('./returner').Return;

var db = new store("data");



Handlers.user = {
	get: function(response, resource){
		console.log('Retrieving User Data'.bgYellow);
		db.get(resource, function(err, obj){
			if(!err){
				Return(response, 201, obj);
			}
			else{
				Logger.Error('failed to retrieve user', err);
				Return(response, 404, 'user ' + resource + ' not found');
			}
		});
	},
	post: function(response, postData){
		console.log('Creating User Data'.bgMagenta);
		db.get(postData.name, function(err, obj){
			if(err){
				db.save(postData.name, postData, function(err){
					if(!err){
						Return(response, 201, 'created user: ' + postData.name);
					}
					else{
						Logger.Error('failed to save user', err);
						Return(response, 500, err);
					}	
				});
			}
			else{
				Logger.Error('Conflict: User already exists', null);
				Return(response, 409, 'User ' + postData.name + ' already exists, please use Put to modify user');
			}
		});
	},
	put: function(response, resource, postData){
		console.log(('updating information for User ' + resource).bgBlue);
		db.get(resource, function(err, obj){
			if(!err){
			 	for (var key in postData){
		 			if(key != 'name')
		 				obj[key] = postData[key];
			 	}
			 	db.save(obj.name, obj, function(err){
			 		if(!err){
			 			Return(response, 200, 'Updated user: '+ obj.name);
			 		}
			 		else {
		 				Logger.Error('failed to update user', err);
		 				Return(response, 500, err);
			 		}
			 	});
			}
			else {
				Logger.Error('failed to retrieve user', err);
				Return(response, 404, 'user ' + resource + ' not found');
			}
		});
	},
}

Handlers.default = function(response){
	response.writeHead(404);
	response.end('Resource Not Found');
}
