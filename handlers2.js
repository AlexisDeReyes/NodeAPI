var Handlers = exports;
var models = require('./models');
var Logger = require('./logger');
var Return = require('./returner').Return;


Handlers.user = {
	get: function(response, resource){
		console.log('Retrieving User Data'.yellow);
		if(resource == '' || resource == undefined){
			models.User.find(function(err, users){
				if(users.length > 0){
					Return(response, 201, users);
				} else {
					Return(response, 404, 'No users found in the db');
				}
			})
		} else {
			models.User.findOne({_id:resource}, function(err, user){
				if(!err){
					if(user != null){
						Return(response, 201, user);
					}
					else {
						Return(response, 404, 'No User found for user with id ' + resource)
					}
				} else {
					Logger.Error('failed to create user', err);
 					Return(response, 500, err);
				}
			});
		}
	},
	post: function(response, postData){
		console.log('Creating User Data'.bgMagenta);
		models.User.findOne({email:postData.email}, function(err, obj){
			if(obj == null){
				var newUser = Assign(new models.User(), postData);
				newUser.save(function(err, obj, numberAffected){
					if(!err && numberAffected > 0){
						Return(response, 201, 'created user: ' + postData.name);
					}
					else {
						Logger.Error('failed to save user', err);
						Return(response, 500, err);
					}
				});
			}
			else{
				Logger.Error('Conflict: User already exists', null);
				Return(response, 409, 'User with email ' + postData.email + ' already exists, please use Put to modify user');
			}
			if(err){
				Logger.Error('failed to create user', err);
 				Return(response, 500, err);
			}
		});
	},
	put: function(response, resource, postData){
		console.log(('updating information for User ' + resource).bgBlue);
		models.User.findOne({_id:resource}, function(err, user){
			if(user != null){
				user = Assign(user, postData);
				user.save(function(err, obj, numberAffected){
					if(!err && numberAffected > 0){
			 			Return(response, 200, 'Updated user: '+ obj.name);
					}
					else if(!err && numberAffected == 0){
		 				Logger.Error('No change with which to update user', null);
		 				Return(response, 400, 'No change with which to update user');
					} else {
						Logger.Error('Failed to update user', err);
						Return(response, 500, err);
					}
				});
			}
			else{
				Logger.Error('failed to retrieve user', err);
				Return(response, 404, 'user with id ' + resource + ' not found');
			}
			if(err){
				Logger.Error('failed to create user', err);
 				Return(response, 500, err);
			}
		});
	}
}

Handlers.group = {
	get: function(response, resource){
		console.log('Retrieving Group Data'.yellow);
		if(resource == '' || resource == undefined){
			models.Group.find(function(err, groups){
				if(groups.length > 0){
					Return(response, 201, groups);
				} else {
					Return(response, 404, 'No groups found in the db');
				}
			})
		} else {
			models.Group.findOne({_id:resource}, function(err, group){
				if(!err){
					if(group != null){
						Return(response, 201, group);
					}
					else {
						Return(response, 404, 'No User found for group with id ' + resource)
					}
				} else {
					Logger.Error('failed to create group', err);
 					Return(response, 500, err);
				}
			});
		}
	},
	post: function(response, postData){
		console.log('Creating Group Data'.bgMagenta);
		models.Group.findOne({name:postData.name}, function(err, obj){
			if(obj == null){
				var newGroup = Assign(new models.Group(), postData);
				newGroup.save(function(err, obj, numberAffected){
					if(!err && numberAffected > 0){
						Return(response, 201, 'created group: ' + postData.name);
					}
					else {
						Logger.Error('failed to save group', err);
						Return(response, 500, err);
					}
				});
			}
			else{
				Logger.Error('Conflict: Group already exists', null);
				Return(response, 409, 'User with email ' + postData.email + ' already exists, please use Put to modify group');
			}
			if(err){
				Logger.Error('failed to create group', err);
 				Return(response, 500, err);
			}
		});
	},
	put: function(response, resource, postData){
		console.log(('updating information for Group ' + resource).bgBlue);
		models.Group.findOne({_id:resource}, function(err, group){
			if(group != null){
				group = Assign(group, postData);
				group.save(function(err, obj, numberAffected){
					if(!err && numberAffected > 0){
			 			Return(response, 200, 'Updated group: '+ obj.name);
					}
					else if(!err && numberAffected == 0){
		 				Logger.Error('No change with which to update group', null);
		 				Return(response, 400, 'No change with which to update group');
					} else {
						Logger.Error('Failed to update group', err);
						Return(response, 500, err);
					}
				});
			}
			else{
				Logger.Error('failed to retrieve group', err);
				Return(response, 404, 'group with id ' + resource + ' not found');
			}
			if(err){
				Logger.Error('failed to update group', err);
 				Return(response, 500, err);
			}
		});
	}
}

Handlers.default = function(response){
	response.writeHead(404);
	response.end('Resource Not Found');
}


function Assign(assigner, assignee){
	for(var key in assignee){
		assigner[key] = assignee[key];
	}

	return assigner;
}