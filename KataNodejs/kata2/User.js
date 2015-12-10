var eventEmitter = require('events');
var util = require('util');
var fs = require('fs');
var zlib = require('zlib');

var users = 0;

function User () {
    eventEmitter.call(this);
}

util.inherits(User, eventEmitter);

User.prototype.save = function(user) {
    var options = {
        'flags': 'a',
        'defaultEncoding': 'utf8'
    };
    users++;
    var writeSteam = fs.createWriteStream('database.txt', options);
    writeSteam.write(JSON.stringify(user) + "\n");
    writeSteam.end();
    this.emit('save', user, users);
};

User.prototype.all = function () {
    var readStream = fs.createReadStream('database.txt');
    readStream.pipe(process.stdout);
};

User.prototype.compress = function() {
    var r = fs.createReadStream('database.txt');
    var w = fs.createWriteStream('database.txt.gz');
    var transform = zlib.createGzip();

    r.pipe(transform).pipe(w).on('finish', function () {
        console.log("done compressing");
    })

};

User.prototype.onSave = function (callback) {
    this.on('save', callback);
};

User.prototype.onError = function (callback) {
    this.on('error', callback);
};


module.exports = User;