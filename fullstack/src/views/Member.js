import { useState, useEffect } from "react";
import memberUtils from "../utils/membersUtils";
import { useSelector } from "react-redux";
import subscriptionsUtils from "../utils/subscriptionsUtils";
import moviesUtils from "../utils/moviesUtils";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";

const MemberComp = (props) => {
  const [member, setMember] = useState({});
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [editMember, setEditMember] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [updatedMember, setUpdatedMember] = useState({});
  const permissions = useSelector((state) => state.user.Permissions);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    async function fetchData() {
      if (props.member) {
        setMember(props.member);
      } else {
        let member = await memberUtils.getMember(state);
        setMember(member);
      }
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    async function fetchData() {
      let allMovies = await moviesUtils.allMovies();
      setMovies(allMovies);
      let id = props.member ? props.member._id : state;
      let MoviesWatched = await subscriptionsUtils.getSubscriptionsByMember(id);
      setWatchedMovies(MoviesWatched);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (props.member) {
        setMember(props.member);
      } else {
        let member = await memberUtils.getMember(state);
        setMember(member);
      }
    }
    fetchData();
  }, [props]);

  const deleteMember = async () => {
    let id = props.member ? props.member._id : state;
    let resp = await memberUtils.deleteMember(id);
    props.updateMembers(resp);
  };

  const updateMember = async () => {
    let resp = await memberUtils.EditMember(props.member._id, updatedMember);
    setEditMember(!editMember);
    props.updateMembers(resp);
  };

  const Subscribe = async () => {
    let subscription = {
      MemberId: member._id,
      Movies: { movieId: movie.id, date: movie.date },
    };
    let resp = await subscriptionsUtils.AddSubscriptions(subscription);
    setSubscribe(!subscribe);
    setWatchedMovies(resp);
  };

  const getMovieName = (id) => {
    let movieData = movies.filter((x) => x._id === id);
    return movieData[0].Name;
  };

  return (
    <Card>
      <CardContent>
        <div
          style={{
            width: "400px",
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor: "gray",
          }}
        >
          <Typography gutterBottom component="div">
            Name : {member.Name} <br />
            Email : {member.Email} <br />
            City : {member.City} <br />
          </Typography>

          <Container component="span" sx={{ p: 2, border: "1px dashed grey" }}>
            <h4> Movies Watched : </h4>
            {watchedMovies.length > 0 && (
              <ul>
                {watchedMovies.map((item) => {
                  return (
                    <div key={item._id}>
                      <MovieCreationTwoToneIcon />
                      <Button
                        onClick={() => {
                          navigate("/movie/" + item.Movies.movieId, {
                            state: item.Movies.movieId,
                          });
                        }}
                      >
                        {getMovieName(item.Movies.movieId)}
                      </Button>
                      ,{item.Movies.date}{" "}
                    </div>
                  );
                })}
              </ul>
            )}
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={(e) => setSubscribe(!subscribe)}
            >
              Subscribe to new movie
            </Button>
            <br />
            {subscribe && (
              <Container
                component="span"
                sx={{ p: 2, border: "1px dashed grey" }}
              >
                Movie :
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={movie.Name}
                    label="Movie"
                    onChange={(e) => setMovie({ ...movie, id: e.target.value })}
                  >
                    {movies.map((item) => {
                      return (
                        <MenuItem key={item._id} value={item._id}>
                          {getMovieName(item._id)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>{" "}
                <br />
                Date :{" "}
                <Input
                  required
                  type="date"
                  name="Date"
                  onChange={(e) => setMovie({ ...movie, date: e.target.value })}
                />
                <br />
                <br />
                <Button
                  size="small"
                  color="success"
                  variant="outlined"
                  onClick={Subscribe}
                >
                  Subscribe
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={(e) => setSubscribe(!subscribe)}
                >
                  Cancel
                </Button>
              </Container>
            )}
          </Container>

          <CardActions>
            {permissions.includes("Update Subscriptions") && (
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(e) => setEditMember(!editMember)}
                >
                  Edit
                </Button>
              </div>
            )}
            {permissions.includes("Delete Subscriptions") && (
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={deleteMember}
                >
                  Delete
                </Button>
              </div>
            )}
          </CardActions>
          <div>
            {editMember && (
              <div
                style={{
                  width: "300px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: "darkGray",
                }}
              >
                Name :{" "}
                <Input
                  name="Name"
                  defaultValue={member.Name}
                  onChange={(e) =>
                    setUpdatedMember({ ...updatedMember, Name: e.target.value })
                  }
                />{" "}
                <br />
                Email :{" "}
                <Input
                  name="Email"
                  defaultValue={member.Email}
                  onChange={(e) =>
                    setUpdatedMember({
                      ...updatedMember,
                      Email: e.target.value,
                    })
                  }
                />
                <br />
                City :{" "}
                <Input
                  name="City"
                  defaultValue={member.City}
                  onChange={(e) =>
                    setUpdatedMember({ ...updatedMember, City: e.target.value })
                  }
                />
                <br />
                <Button
                  size="small"
                  color="success"
                  variant="outlined"
                  onClick={updateMember}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={(e) => setEditMember(!editMember)}
                >
                  Cencel
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberComp;
