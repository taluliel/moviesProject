import axios from 'axios'

const checkUser = async(userName, password) =>
{
    let resp = await axios.get("http://localhost:8000/api/users");
    let users = resp.data;
    let user= users.filter(x=> x.userName===userName && x.password===password)
    return user[0];
}

const newUser = async function (username) {
    let resp = await axios.get("http://localhost:8000/api/users");
    let users = resp.data;
    let user= users.filter(x=> x.userName===username)
    return user[0];
}

const UpdateUser = async function (userData, password) {
    let obj = {
        userName: userData.userName,
        password: password
    }
    let resp = await axios.put("http://localhost:8000/api/users/UpdateUser/"+userData.id ,obj);
    let user = resp.data;
    return user;
}

const loginUtils =  {checkUser, newUser, UpdateUser};
export default loginUtils;

