import { useState, useEffect, useRef } from "react";
import UsersUtils from "../utils/UsersUtils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import CardActions from "@mui/material/CardActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const UserComp = (props) => {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState(false);
  const [disable, setdisable] = useState(true);
  // const inputRef = useRef(null);
  // const [permissions, setPermissions] = useState([]);
  // const permissionsNames = [
  //   "View Subscriptions",
  //   "Create Subscriptions",
  //   "Delete Subscriptions",
  //   "Update Subscriptions",
  //   "View Movies",
  //   "Create Movies",
  //   "Delete Movies",
  //   "Update Movies",
  // ];

  useEffect(() => {
    async function fetchData() {
      setUser(props.user);
    }
    fetchData();
  }, [props]);

  const deleteUser = async () => {
    return await UsersUtils.deleteUser(props.user.id);
  };

  const updateUser = async () => {
    if (user) {
      await UsersUtils.EditUser(props.user.id, user);
      setEditUser(!editUser);
    }
  };

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPermissions(typeof value === "string" ? value.split(",") : value);
  //   setUser({ ...user, Permissions: permissions });
  // };

  // const handleSubmitButton = () => {
  //   alert(inputRef.current.value);
  // };

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
          First Name :{" "}
          <Input
            name="FName"
            value={user.FirstName}
            disabled={disable}
            onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
          />{" "}
          <br />
          Last Name :{" "}
          <Input
            name="LName"
            value={user.LastName}
            disabled={disable}
            onChange={(e) => setUser({ ...user, LastName: e.target.value })}
          />{" "}
          <br />
          User Name :{" "}
          <Input
            name="userName"
            value={user.userName}
            disabled={disable}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <br />
          {/* 
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Permissions</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              disabled={disable}
              value={permissions}
              onChange={handleChange}
              input={<OutlinedInput label="Permissions" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {permissionsNames.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={(props.user.Permissions).includes(name) ? true : false} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          Permissons:
          <br />
          <Checkbox
            name="Permissions"
            value="View Subscriptions"
            id="View Subscriptions"
          />
          <label htmlFor="ViewSubscriptions"> View Subscriptions</label>
          <br />
          <Checkbox
            name="Permissions"
            value="Create Subscriptions"
            id="Create Subscriptions"
            onclick="CheckSub()"
          />
          <label htmlFor="CreateSubscriptions"> Create Subscriptions</label>
          <br />
          <Checkbox
            name="Permissions"
            value="Delete Subscriptions"
            id="Delete Subscriptions"
            onclick="CheckSub()"
          />
          <label htmlFor="DeleteSubscriptions"> Delete Subscriptions</label>
          <br />
          <Checkbox
            name="Permissions"
            value="Update Subscriptions"
            id="Update Subscriptions"
            onclick="CheckSub()"
          />
          <label htmlFor="UpdateSubscriptions"> Update Subscriptions</label>
          <br />
          <Checkbox name="Permissions" value="View Movies" id="View Movies" />
          <label htmlFor="ViewMovies"> View Movies</label>
          <br />
          <Checkbox
            name="Permissions"
            value="Create Movies"
            id="Create Movies"
            onclick="CheckMovie()"
          />
          <label htmlFor="CreateMovies"> Create Movies</label>
          <br />
          <Checkbox
            name="Permissions"
            value="Delete Movies"
            id="Delete Movies"
            onclick="CheckMovie()"
          />
          <label htmlFor="DeleteMovies"> Delete Movies</label>
          <br />
          <Checkbox
            name="Permissions"
            value="Update Movies"
            id="Update Movies"
            onclick="CheckMovie()"
          />
          <label htmlFor="UpdateMovies">Update Movies</label>
          <br />
          {!disable && (
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={updateUser}
            >
              Update User
            </Button>
          )}
          <br />
          <br />
          <CardActions>
            <div>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => setdisable(!disable)}
              >
                Edit
              </Button>
            </div>
            <div>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={deleteUser}
              >
                Delete
              </Button>
            </div>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserComp;
