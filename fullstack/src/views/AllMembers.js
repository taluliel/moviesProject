import {useState, useEffect} from 'react'
import MemberComp from './Member'
import memberUtils from '../utils/membersUtils'
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function AllMembersComp() {

  const [members, setMemebers] = useState([])
  const [addMember, setAddMember] = useState(false)
  const [member, setMember] = useState({})
  const [permissions, setPermissions] = useState([])
  const storeData = useSelector(state => state)

  useEffect(() => {
    async function fetchData() {
      let allMembers =await memberUtils.allMembers();
      setMemebers(allMembers)
      setPermissions(storeData.user.Permissions)
      }
   fetchData();
  },[storeData.user])

  const addNewMember= async()=>{
    await memberUtils.addMember(member);
    setAddMember(!addMember)
  }
  
return (
  <div className="App">

  <h1>Members</h1>
  {permissions.includes("Create Subscriptions") &&
    <div>
    <Button variant="contained" size="small" color="success" onClick={e => setAddMember(!addMember)}>
      Add Member
    </Button><br/><br/>
    </div>
    }
 
<div>
  {addMember&&
         <div style={{width:"300px", borderWidth : "3px", borderStyle : "solid", borderColor : "black"}}>
         Name : <Input name="Name" required onChange={e => setMember({...member, Name : e.target.value})} /> <br/>
         Email : <Input name="Email" required onChange={e => setMember({...member, Email : e.target.value})} /><br/>
         City : <Input name="City" required onChange={e => setMember({...member, City : e.target.value})} /><br/>
         <br/>
                <Button size="small" color="success" variant="outlined" onClick={addNewMember}>Save</Button>
               <Button size="small" color="inherit" variant="outlined" onClick={e => setAddMember(!addMember)}>Cancel</Button>
              </div>
  }
</div><br/><br/>

<Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
  {
    members.map(item =>
      {
        return <Grid key={item._id} item xs={4}> <div><MemberComp  member={item} /><br/></div> </Grid>
      })
  }

</Grid>
  </div>
);
}


export default AllMembersComp;
