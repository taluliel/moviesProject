const express= require('express');
const router=express.Router();
const axios = require('axios');

router.route('/')
    .get(async (req, resp) => { 
try {
    let resp = await axios.get("http://localhost:5000/api/subscriptions");
    let subscriptions = resp.data;
    return subscriptions;
}
catch (err) {
    return err;
}
})


module.exports=router;