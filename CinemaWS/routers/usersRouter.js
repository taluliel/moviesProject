const express= require('express');
const router=express.Router();
const usersBL= require('../models/usersBL');

router.route('/')
    .get(async (req, resp) => {  try {
    let UsersData=await usersBL.getAllUsersData();
    return resp.json(UsersData);
}
catch (err) {
    return err;
}
})

router.route('/deleteUser/:id').get(async (req, resp) => {
    try {
        let user = await usersBL.deleteUser( req.params.id);
        return resp.json(user);
    }
    catch (err) {
        return err;
    }
})

router.route('/addUser').post(async (req, resp) => {
    try {
        let user = await usersBL.addUser( req.body);
        return resp.json(user);
    }
    catch (err) {
        return err;
    }
})

router.route('/EditUser/:id').put(async (req, resp) => {
    try {
        let user = await usersBL.EditUser(req.body);
        return resp.json(user);
    }
    catch (err) {
        return err;
    }
})

router.route('/UpdateUser/:id').put(async (req, resp) => {
    try {
        
        let user = await usersBL.Updateuser(req.params.id, req.body);
        return resp.json(user);
    }
    catch (err) {
        return err;
    }
})



module.exports=router;