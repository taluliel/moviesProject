const membersDAL =require('../DALS/membersDAL');

exports.getMembersData = async function(){
    try {
    let members= await membersDAL.getAllMembers();
    return members;
    }
    catch (err) {
        return err;
    }
}

exports.getMember = async function (id) {
    try {
    let member= await membersDAL.getMember(id);
    return member;
    }
    catch (err) {
        return err;
    }
}

exports.DeleteMember = async function (id) {
    try {
    let member= await membersDAL.DeleteMember(id);
    return member;
    }
    catch (err) {
        return err;
}
}

exports.AddMember = async function (obj) {
    try {
    let member= await membersDAL.AddMember(obj);
    return member;
    }
    catch (err) {
        return err;
    }
}

exports.EditMember = async function (id,obj) {
    try {
    let member= await membersDAL.EditMember(id,obj);
    return member;
    }
    catch (err) {
        return err;
    }
}

exports.getSubscruption = async function () {
    try {
    let subscruption= await subscriptions.getAllSubscriptions();
    return subscruption;
    }
    catch (err) {
        return err;
    }
}

exports.addSubscruption = async function (obj) {
    try {
    let subscruption= await subscriptions.AddSubscriptions(obj);
    return subscruption;
    }
    catch (err) {
        return err;
    }
}