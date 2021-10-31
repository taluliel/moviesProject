const express= require('express');
const router=express.Router();
const subscriptionsBL= require('../models/subscriptionsBL');

router.route('/')
    .get(async (req, resp) => { 
try {
    let subscriptions=await subscriptionsBL.getSubscruption();
    return resp.json(subscriptions);
}
catch (err) {
    return err;
}
})

router.route('/AddSubscriptions').post(async (req, resp) => {
    try {
        let subscription = await subscriptionsBL.addSubscriptions( req.body);
        return resp.json(subscription);
    }
    catch (err) {
        return err;
    }
})


module.exports=router;