import {useState} from 'react'
import loginUtlis from '../utils/loginUtils'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {Link } from 'react-router-dom';

function CreateAccountComp(props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')


const checkUser=async() =>{
  if(userName==="" || password===""){
    setMsg("Please insert UserName & Password")
  }
  else{

    let user= await loginUtlis.newUser(userName);
  
    if (user) {
      if (user.password.length === 0) {
        let Updateuser = await loginUtlis.UpdateUser(user, password);

        if(Updateuser){
          setMsg("Created! Please return to Login page for login website")
        }
        else{
          setMsg("Created Failed")
        }
      }
      else {
        setMsg("User already exist!")
      }
    }
    else {
      setMsg("User not exist!")
    }
}
}
  return (
    <div className="App">

      <h2>Create Account Page</h2>  <br/>
      <Input  placeholder="UserName"  type="text" name="Username" required onChange={e => setUserName(e.target.value)} /> <br/>
      <Input  placeholder="Password" type="password" name="Password" required onChange={e => setPassword(e.target.value)}/>  <br/>
    <br/>
    {msg}<br/><br/>
    <Button size="small" variant="outlined" onClick={checkUser}>Create</Button>
    <br/><br/>
   <Link to="/">Return to Login Page</Link>
    </div>
 
  );
}

export default CreateAccountComp;
