import {useState} from 'react'
import loginUtlis from '../utils/loginUtils'
import { useDispatch } from "react-redux";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {Link } from 'react-router-dom';

function LoginComp(props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const dispatch = useDispatch()

const checkUser=async() =>{

    let userData= await loginUtlis.checkUser(userName, password);
    if(userData){
      if(userName==="" || password===""){
        if(userData.password.length===0){
          setMsg("Please Update Your Password In Create Account Link")
        }
        else
        setMsg("Please insert UserName & Password")
      }
      else{
        dispatch({type : "LOGIN" , payload : userData})
        props.history.push("/main");
      }
    }
   
    else{
      setMsg("UserName or Password are wrong!")
    }
}

  return (
    <div className="App">

      <h2>Login Page</h2>  <br/>
      <Input  placeholder="UserName"  type="text" name="Username" onChange={e => setUserName(e.target.value)} /> <br/>
      <Input  placeholder="Password" type="password" name="Password"  onChange={e => setPassword(e.target.value)}/>  <br/>
    <br/>
    <Button size="small" variant="outlined" onClick={checkUser}>Login</Button>

    <br/><br/>
    {msg} <br/><br/>
    <p> New User? <Link to="/CreateAccount">Create Account</Link></p>

    </div>
  );
}

export default LoginComp;

