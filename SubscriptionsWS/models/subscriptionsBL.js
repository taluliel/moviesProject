let member = require('./memberModel');
let movie = require('./movieModel');
let memberRest = require('../DAL/membersREST');
let movieRest = require('../DAL/moviesREST');
let SubscriptionsRest = require('../DAL/subscriptionsDB');

exports.getAllMembers = async function () {

    let resp = await memberRest.getAllmembers();
    let data = resp.data;
    return data;
}
exports.getAllMembersDB = async function () {

    let resp = await memberRest.getMembersDB();
    return resp;
}

exports.getMember = async function (id) {
    let resp = await memberRest.getMember(id);
    return resp;
}


exports.getAllMovies = async function () {

    let resp = await movieRest.getAllmovies();
    let data = resp.data;
    return data;
}

exports.getAllMoviesDB = async function () {

    let resp = await movieRest.getMoviesDB();
    return resp;
}

exports.getMovie = async function (id) {

    let resp = await movieRest.getMovie(id);
    return resp;
}

exports.getAllsubscriptionsDB = async function () {

    let resp = await SubscriptionsRest.getSubscriptionsDB();
    return resp;
}

exports.addMember = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        let NewMember = new member({
            Name: obj.name,
            Email: obj.email,
            City: obj.address.city
        });
        
        NewMember.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Created');
                }
            })
    })
}

exports.addMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        let NewMovie = new movie({
            Name: obj.name,
            Genres: obj.genres,
            Image: obj.image.medium,
            Premiered: obj.premiered
        });

        NewMovie.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Created');
                }
            })
    })
}

exports.AddSubscriptionsDB = async function (obj) {
    let resp = await SubscriptionsRest.addSubscription(obj);
    return resp;
}


exports.EditMovie = async function ( id,obj) {
    let resp = await movieRest.EditMovie(id, obj);
    return resp;
}

exports.EditMember = async function ( id,obj) {
    let resp = await memberRest.EditMember(id, obj);
    return resp;
}

exports.AddMember = async function (obj) {
    let resp = await memberRest.AddMember(obj);
    return resp;
}

exports.DeleteMovie = async function (id) {
    let DeleteMovie = await movieRest.DeleteMovie(id);
    let resp= await SubscriptionsRest.getSubscriptionsDB();
    let subscriptions= resp.filter(x=> x.Movies.movieId==id);
    subscriptions.forEach(element => {
       SubscriptionsRest.DeleteMovie(element._id);
    });
   
    return DeleteMovie;
}

exports.DeleteMember = async function (id) {
    let resp = await memberRest.DeleteMember(id);
    let resp2= await SubscriptionsRest.DeleteMember(id);
    console.log(resp2)
    return resp;
}


exports.FindMovie = async function (name) {
    let resp = await movieRest.getMoviesDB();
    let allMovies = resp.filter(x =>x.Name.includes(name));
    return allMovies;
  
}

exports.AddMovie = async function (obj) {
    let resp = await movieRest.AddMovie(obj);
    return resp;
}
