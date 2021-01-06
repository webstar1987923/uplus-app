var exec = require('cordova/exec');

module.exports.saveUID = function(arg0, success, error) {
    exec(success, error, "SaveUserID", "saveUID", [arg0]);
}

module.exports.removeUID = function(arg0, success, error) {
    exec(success, error, "SaveUserID", "removeUID", [arg0]);
}