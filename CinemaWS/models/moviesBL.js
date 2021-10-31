const moviesDal =require('../DALS/moviesDAL');

exports.getMoviesData = async function(){
    try {
    let movies= await moviesDal.getAllMovies();
    return movies;
    }
    catch (err) {
        return err;
    }
}

exports.getMovie = async function (id) {
    try {
    let movie= await moviesDal.getMovie(id);
    return movie;
    }
    catch (err) {
        return err;
    }
}

exports.DeleteMovie = async function (id) {
    try {
    let movie= await moviesDal.DeleteMovie(id);
    return movie;
    }
    catch (err) {
        return err;
}
}

exports.AddMovie = async function (obj) {
    try {
    let Movie= await moviesDal.AddMovie(obj);
    return Movie;
    }
    catch (err) {
        return err;
    }
}

exports.EditMovie = async function (id,obj) {
    try {
    let Movie= await moviesDal.EditMovie(id,obj);
    return Movie;
    }
    catch (err) {
        return err;
    }
}
