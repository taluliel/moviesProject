import { useState, useEffect } from 'react'
import moviesUtils from '../utils/moviesUtils'
import MovieComp from './Movie'
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function AllMoviesComp() {

  const [movies, setMovies] = useState([])
  const [addMovie, setAddMovie] = useState(false)
  const [movie, setMovie] = useState({})
  const permissions = useSelector((state) => state.user.Permissions)

  useEffect(() => {
    async function fetchData() {
      let allMovies = await moviesUtils.allMovies();
      setMovies(allMovies)
    }
    fetchData();
  }, [])

  const addNewMovie = async () => {
    await moviesUtils.addMovie(movie);
    setAddMovie(!addMovie)
  }

  const searchMovie = async (movieName) => {
    console.log(movieName)

    if (!movieName) {
      let allMovies = await moviesUtils.allMovies();
      setMovies(allMovies)
    }
    else {
      let allMovies = await moviesUtils.allMovies();
      let searchedMovies = allMovies.filter(x => x.Name.includes(movieName))
      setMovies(searchedMovies)
    }

  }

  return (
    <div className="App">

      <h1>Movies</h1>
      <br />

      {movies &&
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={movies.map((option) => option.Name)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search Movie" />}
            onChange={(event, value) => searchMovie(value)}
          />

          {permissions.includes("Create Movies") &&
            <div>
              <Button variant="contained" size="small" color="success" onClick={e => setAddMovie(!addMovie)}>
                Add Movie
              </Button>
            </div>
          }

          <div>
            {addMovie &&
              <div style={{ width: "300px", borderWidth: "3px", borderStyle: "solid", borderColor: "black" }}>

                Name : <Input name="Name" required onChange={e => setMovie({ ...movie, Name: e.target.value })} /> <br />
                Genres : <Input name="Genres" required onChange={e => setMovie({ ...movie, Genres: e.target.value })} /><br />
                Image URL : <Input name="Image" required onChange={e => setMovie({ ...movie, Image: e.target.value })} /><br />
                Premiered : <Input type="Date" required name="Premiered" onChange={e => setMovie({ ...movie, Premiered: e.target.value })} /><br />
                <br />
                <Button size="small" color="success" variant="outlined" onClick={addNewMovie}>Save</Button>
                <Button size="small" color="inherit" variant="outlined" onClick={e => setAddMovie(!addMovie)}>Cancel</Button>
              </div>
            }
          </div><br /><br />

          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            {
              movies.map(item => {
                return <Grid key={item._id} item xs={4}> <div ><MovieComp movie={item} /><br /></div></Grid>
              })
            }

          </Grid>

        </div>
      }
    </div>
  );
}

export default AllMoviesComp;
