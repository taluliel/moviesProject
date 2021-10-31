import {useState, useEffect} from 'react'
import UsersUtils from '../utils/UsersUtils'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import CardActions from '@mui/material/CardActions';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const UserComp = (props) =>
{
const [user, setUser] = useState({})
const [editUser, setEditUser] = useState(false)
const [disable, setdisable] = useState(true)
const [permissions, setPermissions] = useState([])
const permissionsNames = [
  'View Subscriptions',
   'Create Subscriptions',
   'Delete Subscriptions',
   'Update Subscriptions',
   'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies',
  ];
  
useEffect(() => {
  async function fetchData() {
      setUser(props.user);}
      fetchData();
    },[props])

const deleteUser= async ()=>{
     return await UsersUtils.deleteUser(props.user.id);
}

const updateUser= async()=>{
  if(user){
    await UsersUtils.EditUser(props.user.id, user);
    setEditUser(!editUser)
  }

}

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setPermissions(
    typeof value === 'string' ? value.split(',') : value,
  );
  setUser({...user, Permissions: permissions})
};


return(

  <Card >

  <CardContent>
    <div style={{ width: "400px", borderWidth: "3px", borderStyle: "solid", borderColor: "gray" }}>
    First Name : <Input  name="FName" value={user.FirstName} disabled={disable} required onChange={e => setUser({...user, FirstName : e.target.value})} /> <br/>
    Last Name : <Input name="LName" value={user.LastName} disabled={disable} required onChange={e => setUser({...user, LastName : e.target.value})} /> <br/>
    User Name :  <Input name="userName" value={user.userName} disabled={disable} required onChange={e => setUser({...user, userName : e.target.value})} /><br/>
    Created Date :  <Input disabled name="CreatedDate"  value={user.CreatedDate}/><br/>
    
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
      </FormControl>
      {!disable &&
          <Button variant="contained" size="small" color="success" onClick={updateUser}>
        Update User
          </Button> 
        }
<br/><br/>
<CardActions>
<div>
        <Button size="small" variant="outlined" onClick={e => setdisable(!disable)}>Edit</Button>
        </div>
        <div>
        <Button  size="small" variant="outlined" color="error" onClick={deleteUser}>Delete</Button>
        </div>
 </CardActions>
  </div>
</CardContent>
    </Card>
)
}



export default UserComp;