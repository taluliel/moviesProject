import { useState, useEffect } from "react";
import usersUtils from "../utils/UsersUtils";
import UserComp from "./User";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "View Subscriptions",
  "Create Subscriptions",
  "Delete Subscriptions",
  "Update Subscriptions",
  "View Movies",
  "Create Movies",
  "Delete Movies",
  "Update Movies",
];

function AllUsersComp() {
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [user, setUser] = useState({});
  const [date, setdate] = useState("");
  const [SubscriptionsPer, setSubscriptionsPer] = useState({
    CreateSubscriptions: false,
    DeleteSubscriptions: false,
    UpdateSubscriptions: false,
  });
  const [SubscriptionsPerisChecked, setSubscriptionsPerisChecked] =
    useState(false);
  const [MoviesPer, setMoviesPer] = useState({
    CreateMovies: false,
    DeleteMovies: false,
    UpdateMovies: false,
  });
  const [MoviesPerisChecked, setMoviesPerisChecked] = useState(false);
  const [permissionName, setpermissionName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let allUsers = await usersUtils.allUsers();
      let today = new Date();
      let currentDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      setdate(currentDate);
      setUsers(allUsers);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (
        SubscriptionsPer.CreateSubscriptions ||
        SubscriptionsPer.DeleteSubscriptions ||
        SubscriptionsPer.UpdateSubscriptions
      ) {
        setSubscriptionsPerisChecked(true);
      }
      if (
        !SubscriptionsPer.CreateSubscriptions &&
        !SubscriptionsPer.DeleteSubscriptions &&
        !SubscriptionsPer.UpdateSubscriptions
      ) {
        setSubscriptionsPerisChecked(false);
      }
    }
    fetchData();
  }, [SubscriptionsPer]);

  useEffect(() => {
    async function fetchData() {
      if (
        MoviesPer.CreateMovies ||
        MoviesPer.DeleteMovies ||
        MoviesPer.UpdateMovies
      ) {
        setMoviesPerisChecked(true);
      }
      if (
        !MoviesPer.CreateMovies &&
        !MoviesPer.DeleteMovies &&
        !MoviesPer.UpdateMovies
      ) {
        setMoviesPerisChecked(false);
      }
    }
    fetchData();
  }, [MoviesPer]);

  const addNewUser = async () => {
    let resp = await usersUtils.addUser(user);
    setAddUser(!addUser);
    setpermissionName([]);
    setUsers(resp);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setpermissionName(typeof value === "string" ? value.split(",") : value);
  };

  const checkPermissions = () => {
    setUser({ ...user, Permissions: permissionName });

    let findSubPer = permissionName.find(
      (x) =>
        x === "Create Subscriptions" ||
        x === "Delete Subscriptions" ||
        x === "Update Subscriptions"
    );

    let findMovPer = permissionName.find(
      (x) =>
        x === "Create Movies" || x === "Delete Movies" || x === "Update Movies"
    );

    if (findSubPer) {
      if (!permissionName.find((x) => x === "View Subscriptions")) {
        let arr = permissionName;
        arr.unshift("View Subscriptions");
        setUser({ ...user, Permissions: arr });
      }
    }

    if (findMovPer) {
      if (!permissionName.find((x) => x === "View Movies")) {
        let arr = permissionName;
        arr.unshift("View Movies");
        setUser({ ...user, Permissions: arr });
      }
    }
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <Button
        variant="contained"
        size="small"
        color="success"
        onClick={(e) => setAddUser(!addUser)}
      >
        Add User
      </Button>

      <div>
        {addUser && (
          <div
            style={{
              width: "300px",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          >
            First Name :{" "}
            <Input
              name="FName"
              required
              onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
            />{" "}
            <br />
            Last Name :{" "}
            <Input
              name="LName"
              required
              onChange={(e) => setUser({ ...user, LastName: e.target.value })}
            />{" "}
            <br />
            User Name :{" "}
            <Input
              name="userName"
              required
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
            <br />
            Created Date : <Input disabled name="CreatedDate" value={date} />
            <br />
            Permissions : <br />
            <FormControl sx={{ m: 1, width: 300 }} style={{ width: "80%" }}>
              <InputLabel id="demo-multiple-name-label">Permissions</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={permissionName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                onClose={checkPermissions}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={permissionName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br /> <br />
            <Button
              size="small"
              color="success"
              variant="outlined"
              onClick={addNewUser}
            >
              Save
            </Button>{" "}
            {""}
            <Button
              size="small"
              color="inherit"
              variant="outlined"
              onClick={(e) => {
                setAddUser(!addUser);
                setpermissionName([]);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <br />
      <br />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {users.map((item) => {
          return (
            <Grid key={item.id} item xs={4}>
              {" "}
              <div>
                <UserComp user={item} updateUser={(data) => setUsers(data)} />
                <br />
              </div>{" "}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default AllUsersComp;
