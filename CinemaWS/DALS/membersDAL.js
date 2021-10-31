const axios = require('axios');

exports.getAllMembers = async function()
{
    let resp = await axios.get("http://localhost:5000/api/subscriptions/members");
    let members = resp.data;
    return members;
}

exports.getMember = async function(id)
{
    let resp = await axios.get("http://localhost:5000/api/subscriptions/member/" + id);
    let member = resp.data;
    return member;
}

exports.DeleteMember = async function(id)
{
    let resp = await axios.put("http://localhost:5000/api/subscriptions/DeleteMember/"+id);
    let Member = resp.data;
    return Member;
}

exports.AddMember = async function(obj)
{
    let resp = await axios.post("http://localhost:5000/api/subscriptions/AddMember", obj);
    let Member = resp.data;
    return Member;
}

exports.EditMember = async function(id, obj)
{
    let resp = await axios.put("http://localhost:5000/api/subscriptions/EditMember/"+id , obj);
    let member = resp.data;
    return member;
}

exports.getAllSubscriptions = async function()
{
    let resp = await axios.get("http://localhost:5000/api/subscriptions/subscriptions");
    let subscriptions = resp.data;
    return subscriptions;
}

exports.AddSubscriptions = async function(obj)
{
    let resp = await axios.post("http://localhost:5000/api/subscriptions/AddSubscriptions", obj);
    let subscriptions = resp.data;
    return subscriptions;
}
