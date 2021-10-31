const express= require('express');
const router=express.Router();
const membersBL= require('../models/membersBL');

router.route('/')
    .get(async (req, resp) => { 
try {
    let members=await membersBL.getMembersData();
    return resp.json(members);
}
catch (err) {
    return err;
}
})

router.route('/member/:id').get(async (req, resp) => {
    try {
        let member = await membersBL.getMember( req.params.id);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})


router.route('/deleteMember/:id').get(async (req, resp) => {
    try {
        let member = await membersBL.DeleteMember( req.params.id);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})

router.route('/addMember').post(async (req, resp) => {
    try {
        let member = await membersBL.AddMember( req.body);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})

router.route('/EditMember/:id').post(async (req, resp) => {
    try {
        let member = await membersBL.EditMember( req.params.id, req.body);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})



module.exports=router;