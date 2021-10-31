import axios from 'axios'

const allMovies = async() =>
{
    let resp = await axios.get("http://localhost:8000/api/movies");
    let movies = resp.data;
    return movies;
}
const getMovie = async(id) =>
{
    let resp = await axios.get("http://localhost:8000/api/movies/movie/" +id);
    let movie = resp.data;
    return movie;
}
const deleteMovie = async(id) =>
{
    let resp = await axios.get("http://localhost:8000/api/movies/deleteMovie/" + id);
    let movie = resp.data;
    return movie;
}

const addMovie = async(obj) =>
{
    let resp = await axios.post("http://localhost:8000/api/movies/addMovie" ,obj);
    let movie = resp.data;
    return movie;
}

const EditMovie = async(id, obj) =>
{
    let resp = await axios.put("http://localhost:8000/api/movies/EditMovie/"+id ,obj);
    let movie = resp.data;
    return movie;
}

const moviesUtils = {allMovies,getMovie, deleteMovie, addMovie, EditMovie};
export default moviesUtils;