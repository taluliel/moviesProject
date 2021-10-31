import { useState, useEffect } from 'react'
import moviesUtils from '../utils/moviesUtils'
import subscriptionsUtils from '../utils/subscriptionsUtils'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import memberUtils from '../utils/membersUtils'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';

const MovieComp = (props) => {
  const [movie, setMovie] = useState({})
  const [members, setMemebers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [editMovie, setEditMovie] = useState(false)
  const [updatedMovie, setUpdatedMovie] = useState({})
  const permissions = useSelector((state) => state.user.Permissions)

  useEffect(() => {
    async function fetchData() {
      let allMembers = await memberUtils.allMembers();
      setMemebers(allMembers);
      let id = props.movie ? props.movie._id : props.match.params.id
      let subscriptionsData = await subscriptionsUtils.getSubscriptionsByMovie(id);
      setSubscriptions(subscriptionsData)
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (props.movie) {
        setMovie(props.movie)
      }
      else {
        let movie = await moviesUtils.getMovie(props.match.params.id);
        setMovie(movie)
      }
      ;
    }
    fetchData();
  }, [props])

  const deleteMovie = async () => {
    let movieDeleted = await moviesUtils.deleteMovie(movie._id);
    return movieDeleted
  }

  const sendData = async () => {
    await moviesUtils.EditMovie(movie._id, updatedMovie);
    setEditMovie(!editMovie)

  }

  const getMemberName = (id) => {
    let memberData = members.filter(x => x._id === id);
    return memberData[0].Name;
  }

  return (
    <Card >

      <CardContent>
        <div style={{ width: "400px", borderWidth: "3px", borderStyle: "solid", borderColor: "gray" }}>
          <Typography gutterBottom variant="h6" component="div">
            {movie.Name},   {movie.Premiered}
          </Typography>

          {movie.Genres &&
            <div>
              Genres:  {(movie.Genres).toString()}<br /> <br />
              <img alt={movie.id} width="140px" height="200px" src={movie.Image} /><br />
            </div>
          }

          <div>
            {subscriptions.length > 0 &&
              <Container component="span" sx={{ border: '1px dashed grey' }}>
                <h4> Subscriptions Watched : </h4>
                {subscriptions.map((item, index) => {
                  return <div key={index}>
                    <PersonOutlineTwoToneIcon />
                    <Link to={"/member/" + item.MemberId} >{getMemberName(item.MemberId)}</Link>,
                    {item.Movies.date} </div>
                })}
              </Container>
            }
          </div>

          <CardActions>
            {permissions.includes("Update Movies") &&
              <div>
                <Button size="small" variant="outlined" onClick={e => setEditMovie(!editMovie)}>Edit</Button>
              </div>
            }
            {permissions.includes("Delete Movies") &&
              <div>
                <Button size="small" variant="outlined" color="error" onClick={deleteMovie}>Delete</Button>
              </div>
            }
          </CardActions>
          <div>
            {editMovie &&
              <Container component="span" sx={{ p: 2, border: '1px dashed grey' }}>

                Name : <Input size="small" name="Name" defaultValue={movie.Name} onChange={e => setUpdatedMovie({ ...updatedMovie, Name: e.target.value })} /> <br />
                Genres : <Input size="small" name=" Genres" defaultValue={movie.Genres} onChange={e => setUpdatedMovie({ ...updatedMovie, Genres: e.target.value })} /><br />
                Image URL : <Input size="small" name="Image" defaultValue={movie.Image} onChange={e => setUpdatedMovie({ ...updatedMovie, Image: e.target.value })} /><br />
                Premiered : <Input size="small" type="date" name="Premiered" disabled value={movie.Premiered} onChange={e => setUpdatedMovie({ ...updatedMovie, Premiered: movie.Premiered })} /><br />
                <br />
                <Button size="small" color="success" variant="outlined" onClick={sendData}>Save</Button>
                <Button variant="outlined" color="inherit" size="small" onClick={e => setEditMovie(!editMovie)}>Cancel</Button>


              </Container>
            }
          </div>
        </div>
      </CardContent>
    </Card>)
}



export default MovieComp;