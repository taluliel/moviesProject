import { useState, useEffect, useRef } from "react";
import UsersUtils from "../utils/UsersUtils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import CardActions from "@mui/material/CardActions";
import {
  FormControl,
  Grid,
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
const UserComp = (props) => {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState(false);
  const [disable, setdisable] = useState(true);
  const [permissionName, setpermissionName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(props.user);
      setUser(props.user);
    }
    fetchData();
  }, []);

  const deleteUser = async () => {
    let resp = await UsersUtils.deleteUser(props.user.id);
    props.updateUser(resp);
  };

  const updateUser = async () => {
    let resp = await UsersUtils.EditUser(props.user.id, user);
    setEditUser(!editUser);
    setpermissionName([]);
    setdisable(!disable);
    props.updateUser(resp);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setpermissionName(typeof value === "string" ? value.split(",") : value);
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
          First Name :{" "}
          <Input
            name="FName"
            value={props.user.FirstName}
            disabled={disable}
            onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
          />{" "}
          <br />
          Last Name :{" "}
          <Input
            name="LName"
            value={props.user.LastName}
            disabled={disable}
            onChange={(e) => setUser({ ...user, LastName: e.target.value })}
          />{" "}
          <br />
          User Name :{" "}
          <Input
            name="userName"
            value={props.user.userName}
            disabled={disable}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <br />
          Permissons:
          {props.user.Permissions.length > 0 && (
            <Grid item xs={6}>
              <ul>
                {props.user.Permissions.map((per, index) => {
                  return <li key={index}>{per}</li>;
                })}
              </ul>
            </Grid>
          )}
          <br />
          {!disable && (
            <FormControl sx={{ m: 1, width: 300 }} style={{ width: "80%" }}>
              <InputLabel id="demo-multiple-name-label">Permissons</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={permissionName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                disabled={disable}
                onClose={() => {
                  setUser({ ...user, Permissions: permissionName });
                }}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={permissionName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <br /> <br />
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
