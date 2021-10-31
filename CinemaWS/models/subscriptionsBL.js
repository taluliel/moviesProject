const subscriptionsDAL =require('../DALS/subscriptionsDAL');

exports.getSubscruption = async function () {
    try {
    let subscruption= await subscriptionsDAL.getAllSubscriptions();
    return subscruption;
    }
    catch (err) {
        return err;
    }
}

exports.addSubscriptions = async function (obj) {
    try {
    let subscruption= await subscriptionsDAL.AddSubscriptions(obj);
    return subscruption;
    }
    catch (err) {
        return err;
    }
}