var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id                  :    ObjectId, 
    email               :    String,
    name                :    String,
    password            :    String,
    registeredItems     :    [RegisteredItem]
});

var RegisteredItemSchema = new Schema({
    id                  :    ObjectId,
    name                :    String,
    link                :    String,
    description         :    String, 
    comments            :    [String]
});

var GroupSchema = new Schema({
    id                  :    ObjectId,
    name                :    String,
    password            :    String,
    users               :    [String]
});

mongoose.connect('mongodb://localhost/registry', {server: {poolSize: 1}});

var User = mongoose.model('User', UserSchema);
var RegisteredItem = mongoose.model('RegisteredItem', RegisteredItemSchema);
var Group = mongoose.model('Group', GroupSchema);


exports.User = User;
exports.RegisteredItem = RegisteredItem;
exports.Group = Group;
