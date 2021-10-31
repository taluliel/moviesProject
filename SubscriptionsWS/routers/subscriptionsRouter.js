const SubscriptionsBL = require('../models/subscriptionsBL');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(async (req, resp) => {
        try {
            let memberResp = await SubscriptionsBL.getAllMembers();
            let MemberaDB = await SubscriptionsBL.getAllMembersDB();
            if (MemberaDB.length == 0) {
                memberResp.forEach(element => {
                    SubscriptionsBL.addMember(element);
                });
            }

            let MoviesDB = await SubscriptionsBL.getAllMoviesDB();
            let movieResp = await SubscriptionsBL.getAllMovies();
            if (MoviesDB.length == 0) {
                movieResp.forEach(element => {
                    SubscriptionsBL.addMovie(element);
                });
            }
        
            return resp.json("Done");
        }
        catch (err) {
            return err;
        }
})

router.route('/members')
    .get(async (req, resp) => {
        try {
            let MemberaDB = await SubscriptionsBL.getAllMembersDB();

            return resp.json(MemberaDB);
        }
        catch (err) {
            return err;
        }
 })

 router.route('/member/:id')
    .get(async (req, resp) => {
        try {
            let Member = await SubscriptionsBL.getMember(req.params.id);
            return resp.json(Member);
        }
        catch (err) {
            return err;
        }
 })


router.route('/movies')
    .get(async (req, resp) => {
        try {
            let MoviesDB = await SubscriptionsBL.getAllMoviesDB();

            return resp.json(MoviesDB);
        }
        catch (err) {
            return err;
}})

router.route('/movie/:id')
    .get(async (req, resp) => {
        try {
            let Movie = await SubscriptionsBL.getMovie(req.params.id);
            return resp.json(Movie);
        }
        catch (err) {
            return err;
}})

router.route('/subscriptions')
    .get(async (req, resp) => {
        try {
            let subscriptionsDB = await SubscriptionsBL.getAllsubscriptionsDB();

            return resp.json(subscriptionsDB);
        }
        catch (err) {
            return err;
        }
})

router.route('/AddSubscriptions').post(async (req, resp) => {
        try {
            console.log("hello")
            let subscriptionsDB = await SubscriptionsBL.AddSubscriptionsDB(req.body);
            return resp.json(subscriptionsDB);
        }
        catch (err) {
            return err;
        }
})

router.route('/EditMovie/:id').put(async (req, resp) => {
    try {
        let movie = await SubscriptionsBL.EditMovie( req.params.id ,req.body);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})

router.route('/EditMember/:id').put(async (req, resp) => {
    try {
        let member = await SubscriptionsBL.EditMember( req.params.id ,req.body);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})

router.route('/AddMember').post(async (req, resp) => {
    try {
        let member = await SubscriptionsBL.AddMember(req.body);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})

router.route('/AddMovie').post(async (req, resp) => {
    try {
        let movie = await SubscriptionsBL.AddMovie(req.body);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})

router.route('/DeleteMovie/:id').put(async (req, resp) => {
    try {
        let movie = await SubscriptionsBL.DeleteMovie( req.params.id);
        return resp.json(movie);
    }
    catch (err) {
        return err;
    }
})

router.route('/DeleteMember/:id').put(async (req, resp) => {
    try {
        let member = await SubscriptionsBL.DeleteMember( req.params.id);
        return resp.json(member);
    }
    catch (err) {
        return err;
    }
})

router.route('/FindMovie/:name')
    .get(async (req, resp) => {
        try {
            let movie = await SubscriptionsBL.FindMovie( req.params.name);
            return resp.json(movie);
        }
        catch (err) {
            return err;
}})
module.exports = router;