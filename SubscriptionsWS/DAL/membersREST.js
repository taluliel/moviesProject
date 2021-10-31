const axios= require('axios');
const Member = require('../models/memberModel');

exports.getAllmembers= function(){

    return axios.get('https://jsonplaceholder.typicode.com/users');
}

exports.getMembersDB = function () {
    return new Promise((resolve, reject) => {
        Member.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.getMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.EditMember = function (id, obj) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.AddMember = function (obj) {
    return new Promise((resolve, reject) => {
        let member = new Member({
            Name: obj.Name,
            Email:  obj.Email,
            City:  obj.City,
        });
        member.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(member._id);
            }
        })
    })
}

exports.DeleteMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}