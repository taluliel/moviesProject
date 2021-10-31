import {useState, useEffect} from 'react'
import usersUtils from '../utils/UsersUtils'
import UserComp from './User';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';

function AllUsersComp() {

  const [users, setUsers] = useState([])
  const [addUser, setAddUser] = useState(false)
  const [user, setUser] = useState({})
  const [date, setdate] = useState('')
  const [SubscriptionsPer, setSubscriptionsPer]= useState({CreateSubscriptions: false, DeleteSubscriptions: false , UpdateSubscriptions: false})
  const[SubscriptionsPerisChecked, setSubscriptionsPerisChecked]= useState(false)
  const [MoviesPer, setMoviesPer]= useState({CreateMovies: false, DeleteMovies: false , UpdateMovies: false})
  const[MoviesPerisChecked, setMoviesPerisChecked]= useState(false)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    async function fetchData() {
   let allUsers =await usersUtils.allUsers();
   let today = new Date();
   let currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   setdate(currentDate);
   setUsers(allUsers);}
   fetchData();
  },[])

  useEffect(() => {
    async function fetchData() {
   if(SubscriptionsPer.CreateSubscriptions || SubscriptionsPer.DeleteSubscriptions || SubscriptionsPer.UpdateSubscriptions){
    setSubscriptionsPerisChecked(true)
   }
   if(!SubscriptionsPer.CreateSubscriptions && !SubscriptionsPer.DeleteSubscriptions && !SubscriptionsPer.UpdateSubscriptions){
    setSubscriptionsPerisChecked(false)
   }}
   fetchData();
  },[SubscriptionsPer])

  useEffect(() => {
    async function fetchData() {
   if(MoviesPer.CreateMovies || MoviesPer.DeleteMovies || MoviesPer.UpdateMovies){
    setMoviesPerisChecked(true)
   }
   if(!MoviesPer.CreateMovies && !MoviesPer.DeleteMovies && !MoviesPer.UpdateMovies){
    setMoviesPerisChecked(false)
   }}
   fetchData();
  },[MoviesPer])

//Create permissions array
  const addPermissions=(e) =>{
    let per= permissions;
    console.log(e.target.value)
    if (e.target.checked) {
       per.push(e.target.value)
    } 
    if (!e.target.checked) {
       let index = per.indexOf(e.target.value)
       per.splice(index, 1)
     } 

     if(SubscriptionsPerisChecked){
         per.push("View Subscriptions")
     }
     else if(!SubscriptionsPerisChecked){
        let index = per.indexOf("View Subscriptions")
        per.splice(index, 1)
     }
     if(MoviesPerisChecked){
        per.push("View Movies")
    }
    else if(!MoviesPerisChecked){
        let index = per.indexOf("View Movies")
        per.splice(index, 1)
     }
     setPermissions(per)
     setUser({...user, Permissions : permissions})
  }

  const addNewUser= async()=>{
    await usersUtils.addUser(user);
    setAddUser(!addUser)
  }

return (
  <div className="App">

  <h1>Users</h1>
    <Button variant="contained" size="small" color="success" onClick={e => setAddUser(!addUser)}>
    Add User
    </Button>
 
<div>
  {addUser&&
         <div style={{width:"300px", borderWidth : "3px", borderStyle : "solid", borderColor : "black"}}>
         First Name :  <Input name="FName" required onChange={e => setUser({...user, FirstName : e.target.value})} /> <br/>
         Last Name :  <Input name="LName" required onChange={e => setUser({...user, LastName : e.target.value})} /> <br/>
         User Name :  <Input name="userName" required onChange={e => setUser({...user, userName : e.target.value})} /><br/>
         Created Date : <Input disabled name="CreatedDate" value={date}/><br/>
         Permissions : <br/>
         <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" checked={SubscriptionsPerisChecked} onChange={() => setSubscriptionsPerisChecked(!SubscriptionsPerisChecked)}  type="checkbox" value="View Subscriptions" id="ViewSubscriptions"/>
        <label htmlFor="ViewSubscriptions"> View Subscriptions</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" value="Create Subscriptions" id="CreateSubscriptions" onChange={addPermissions}  onClick={e => setSubscriptionsPer({...SubscriptionsPer, CreateSubscriptions : !SubscriptionsPer.CreateSubscriptions})}/>
        <label htmlFor="CreateSubscriptions"> Create Subscriptions</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" value="Delete Subscriptions" id="DeleteSubscriptions" onChange={addPermissions} onClick={e => setSubscriptionsPer({...SubscriptionsPer, DeleteSubscriptions : !SubscriptionsPer.DeleteSubscriptions})}/>
        <label htmlFor="DeleteSubscriptions"> Delete Subscriptions</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" value="Update Subscriptions" id="UpdateSubscriptions"  onChange={addPermissions} onClick={e => setSubscriptionsPer({...SubscriptionsPer, UpdateSubscriptions : !SubscriptionsPer.UpdateSubscriptions})}/>
        <label htmlFor="UpdateSubscriptions"> Update Subscriptions</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" checked={MoviesPerisChecked} onChange={() => setMoviesPerisChecked(!MoviesPerisChecked)} type="checkbox" value="View Movies" id="ViewMovies"/>
        <label htmlFor="ViewMovies"> View Movies</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" value="Create Movies" id="CreateMovies"  onChange={addPermissions} onClick={e => setMoviesPer({...MoviesPer, CreateMovies : !MoviesPer.CreateMovies})}/>
        <label htmlFor="CreateMovies"> Create Movies</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" value="Delete Movies" id="DeleteMovies" onChange={addPermissions} onClick={e => setMoviesPer({...MoviesPer, DeleteMovies : !MoviesPer.DeleteMovies})}/>
        <label htmlFor="DeleteMovies"> Delete Movies</label><br/>
        <Checkbox  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} name="Permissions" value="Update Movies" id="UpdateMovies" onChange={addPermissions} onClick={e => setMoviesPer({...MoviesPer, UpdateMovies : !MoviesPer.UpdateMovies})}/>
        <label htmlFor="UpdateMovies">Update Movies</label><br/>

        <Button size="small" color="success" variant="outlined" onClick={addNewUser}>Save</Button>
        <Button size="small" color="inherit" variant="outlined" onClick={e =>setAddUser(!addUser)}>Cancel</Button>
   </div>
  }
</div><br/><br/>
<Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
  {
    users.map(item =>
      {
        return <Grid key={item.id} item xs={4}> <div ><UserComp  user={item} /><br/></div> </Grid>
      })
  }

</Grid>
  </div>
);
}


export default AllUsersComp;
