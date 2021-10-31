const express= require('express');
const router=express.Router();
const moviesBL= require('../models/moviesBL');

router.route('/')
    .get(async (req, resp) => {  try {
    let movies=await moviesBL.getMoviesData();
    return resp.json(movies);
}
catch (err) {
    return err;
}
})

router.route('/movie/:id').get(async (req, resp) => {
    try {
        let movie = await moviesBL.getMovie( req.params.id);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})

router.route('/deleteMovie/:id').get(async (req, resp) => {
    try {
        let movie = await moviesBL.DeleteMovie( req.params.id);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})

router.route('/addMovie').post(async (req, resp) => {
    try {
        let movie = await moviesBL.AddMovie( req.body);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})

router.route('/EditMovie/:id').put(async (req, resp) => {
    try {
        let movie = await moviesBL.EditMovie( req.params.id, req.body);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})


module.exports=router;