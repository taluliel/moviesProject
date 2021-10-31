const axios = require('axios');

exports.getAllSubscriptions = async function () {
    let resp = await axios.get("http://localhost:5000/api/subscriptions/subscriptions");
    let subscriptions = resp.data;
    return subscriptions;
}

exports.AddSubscriptions = async function (obj) {
    let resp = await axios.post("http://localhost:5000/api/subscriptions/AddSubscriptions", obj);
    let subscriptions = resp.data;
    return subscriptions;
}
