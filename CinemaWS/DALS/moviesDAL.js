const axios = require('axios');

exports.getAllMovies = async function()
{
    let resp = await axios.get("http://localhost:5000/api/subscriptions/movies");
    let movies = resp.data;
    return movies;
}

exports.getMovie = async function(id)
{
    let resp = await axios.get("http://localhost:5000/api/subscriptions/movie/"+id);
    let movie = resp.data;
    return movie;
}
exports.DeleteMovie = async function(id)
{
    let resp = await axios.put("http://localhost:5000/api/subscriptions/DeleteMovie/"+id);
    let movie = resp.data;
    return movie;
}

exports.AddMovie = async function(obj)
{
    let resp = await axios.post("http://localhost:5000/api/subscriptions/AddMovie", obj);
    let Movie = resp.data;
    return Movie;
}

exports.EditMovie = async function(id, obj)
{
    let resp = await axios.put("http://localhost:5000/api/subscriptions/EditMovie/"+id , obj);
    let Movie  = resp.data;
    return Movie ;
}
