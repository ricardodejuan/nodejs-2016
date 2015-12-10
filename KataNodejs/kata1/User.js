var eventEmitter = require('events');
var util = require('util');

var dataBase = [];

function User () {
    eventEmitter.call(this);
}

util.inherits(User, eventEmitter);

User.prototype.save = function(user) {
    dataBase.push(user);
    this.emit('save', user, dataBase.indexOf(user));
};

User.prototype.erase = function (id) {
    if (dataBase[id]) {
        dataBase.splice(id, 1);
        this.emit('erased', id);
    } else {
        this.emit('error', "Error remove");
    }
};

User.prototype.onSave = function (callback) {
    this.on('save', callback);
};

User.prototype.onDelete = function (callback) {
    this.on('erased', callback);
};

User.prototype.onError = function (callback) {
    this.on('error', callback);
};

User.prototype.all = function () {
    return dataBase;
};

module.exports = User;