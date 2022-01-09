import axios from "axios";

const allMovies = async () => {
  let resp = await axios.get("http://localhost:8000/api/movies");
  let movies = resp.data;
  return movies;
};
const getMovie = async (id) => {
  let resp = await axios.get("http://localhost:8000/api/movies/movie/" + id);
  let movie = resp.data;
  return movie;
};
const deleteMovie = async (id) => {
  await axios.get("http://localhost:8000/api/movies/deleteMovie/" + id);
  return allMovies();
};

const addMovie = async (obj) => {
  await axios.post("http://localhost:8000/api/movies/addMovie", obj);
  return allMovies();
};

const EditMovie = async (id, obj) => {
  await axios.put("http://localhost:8000/api/movies/EditMovie/" + id, obj);
  return allMovies();
};

const moviesUtils = { allMovies, getMovie, deleteMovie, addMovie, EditMovie };
export default moviesUtils;
