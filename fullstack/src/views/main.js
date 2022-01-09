import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LoginComp from "./login";
import AllMembersComp from "./AllMembers";
import AllMoviesComp from "./AllMovies";
import moviesUtils from "../utils/moviesUtils";
import AllUsersComp from "./UsersManagement";
import CreateAccountComp from "./CreateAccount";
import MemberComp from "./Member";
import MovieComp from "./Movie";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  ImageList,
  ImageListItem,
} from "@material-ui/core";

function MainComp() {
  const [user, setUser] = useState({ userData: {}, permissions: [], Role: "" });
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:8000/api/main");
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let allMovies = await moviesUtils.allMovies();
      setMovies(allMovies.splice(0, 32));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setUser({
        ...user,
        userData: storeData.user,
        permissions: storeData.user.Permissions,
        Role: storeData.user.Role,
      });
    }
    fetchData();
  }, [storeData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <h2>Movies - Subscriptions Web Site </h2>
      Welcome {user.userData.userName} <br />
      <Box sx={{ Width: "100%" }}>
        <Paper>
          <Tabs value={value} onChange={handleChange} centered>
            {user.permissions && (
              <div>
                {user.permissions.includes("View Movies") && (
                  <Tab label="All Movies" to="/movies" component={Link} />
                )}
                {user.permissions.includes("View Subscriptions") && (
                  <Tab label="All Memebers" to="/members" component={Link} />
                )}

                {user.Role === "admin" && (
                  <Tab label="Users Management" to="/users" component={Link} />
                )}

                <Tab
                  label="Log Out"
                  to="/"
                  component={Link}
                  onClick={() => dispatch({ type: "LOGOUT", payload: {} })}
                />
              </div>
            )}
          </Tabs>
        </Paper>
      </Box>
      {location.pathname === "/main" && (
        <div>
          <ImageList variant="woven" cols={8} gap={8}>
            {movies.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  height="180"
                  src={`${item.Image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.Image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.Name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<LoginComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/CreateAccount" element={<CreateAccountComp />} />
        <Route path="/movies" element={<AllMoviesComp />} />
        <Route path="/members" element={<AllMembersComp />} />
        <Route path="/member/:id" element={<MemberComp />} />
        <Route path="/movie/:id" element={<MovieComp />} />
        <Route path="/users" element={<AllUsersComp />} />
      </Routes>
    </div>
  );
}

export default MainComp;
