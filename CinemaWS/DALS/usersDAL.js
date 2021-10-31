const jsonFile = require('jsonfile');
const User = require('../models/usersModel');

exports.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./DALS/Users.json', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

exports.getAllPermissions = function () {
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./DALS/Permissions.json', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

exports.getUsersDB = function () {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
             resolve(data);
            }
        });
    })
}

exports.getUserDB = function (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.getUser = function (username, pass) {
    return new Promise((resolve, reject) => {
        User.findOne({ userName: username, password: pass }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.checkUser = function (username) {
    return new Promise((resolve, reject) => {
        User.findOne({ userName: username }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}
exports.updateUser = function (id, obj) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id,
            {
                userName: obj.userName,
                password: obj.password==null? " " : obj.password
            }, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    })
}

exports.updateUserPass = function (id, obj) {
    return new Promise((resolve, reject) => {
       
        User.findByIdAndUpdate(id,obj, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    })
}

exports.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    })
}

exports.deleteUserJson = async function (AllUsers, id) {
    return new Promise((resolve, reject) => {
        let index = AllUsers.findIndex(x => x.Id == id);
        if (index >= 0) {
            AllUsers.splice(index, 1);
            jsonFile.writeFile('./DALS/Users.json', AllUsers, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            })
        }

    });
}


exports.deletepermissionJson = async function (PermissionsArray, id) {
    return new Promise((resolve, reject) => {
        let index = PermissionsArray.findIndex(x => x.Id == id);
        if (index >= 0) {
            PermissionsArray.splice(index, 1);
            jsonFile.writeFile('./DALS/Permissions.json', PermissionsArray, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            })
        }

    });
}

exports.addUser = function (obj) {
    return new Promise((resolve, reject) => {
        let user = new User({
            userName: obj.userName,
            password: ""
        });

        user.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user._id);
            }
        })
    })
}

exports.addUserJson = async function (usersArray) {
    return new Promise((resolve, reject) => {
        jsonFile.writeFile('./DALS/Users.json', usersArray, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        })
    });

}

exports.addPermissionsJson = async function (PermissionsArray) {
    return new Promise((resolve, reject) => {
        jsonFile.writeFile('./DALS/Permissions.json', PermissionsArray, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        })
    });

}
