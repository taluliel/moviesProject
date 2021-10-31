const axios= require('axios');
const Movies = require('../models/movieModel');

exports.getAllmovies= function(){

    return axios.get('https://api.tvmaze.com/shows');
}

exports.getMoviesDB = function () {
    return new Promise((resolve, reject) => {
        Movies.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.getMovie = function (id) {
    return new Promise((resolve, reject) => {
        Movies.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.EditMovie = function (id, obj) {
    return new Promise((resolve, reject) => {
        Movies.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.DeleteMovie = function (id) {
    return new Promise((resolve, reject) => {
        Movies.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.AddMovie = function (obj) {
    return new Promise((resolve, reject) => {
        let Movie = new Movies({
            "Name": obj.Name,
            "Genres": obj.Genres,
            "Image": obj.Image,
            "Premiered" :  obj.Premiered
        });
        Movie.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(Movie._id);
            }
        })
    })
}
