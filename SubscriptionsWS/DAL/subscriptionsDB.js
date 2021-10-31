const subscriptions = require('../models/subscriptionsModel');

exports.getSubscriptionsDB = function () {
    return new Promise((resolve, reject) => {
        subscriptions.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.addSubscription = function (obj) {
    return new Promise((resolve, reject) => {
        let subscription = new subscriptions({
            MemberId: obj.MemberId,
            Movies: obj.Movies
        });
        console.log(subscription)
        subscription.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscription._id);
            }
        })
    })
}

exports.updateSubscription = function (id, obj) {
    return new Promise((resolve, reject) => {

        subscriptions.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.DeleteMovie = function (id) {
        return new Promise((resolve, reject) => {
            subscriptions.findByIdAndDelete(id, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        })
    }

exports.DeleteMember = function (id) {
    return new Promise((resolve, reject) => {
        subscriptions.findOneAndDelete({MemberId: id}, function (err, data) {
             if (err) {
                 reject(err);
            }
             else {
                    resolve(data);
                }
            });
        })
}
    