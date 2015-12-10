var User = require('./User');
var user = new User();

var user1 = {"name": "Jane",  "occupation": "manager"};
var user2 = {"name": "John",  "occupation": "developer"};

user.onSave(function(user, userId) {
    console.log('saved: '+ user.name + " (" + userId + ")");
});

user.onDelete(function(id) {
    console.log('erased: ' + id);
});

user.onError(function(error) {
    console.log('error on erase: ' + error);
});


user.save(user1);
user.save(user2);

user.all();

user.compress();

user.all();