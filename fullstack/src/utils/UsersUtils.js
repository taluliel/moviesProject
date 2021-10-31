import axios from 'axios'

const allUsers = async() =>
{
    let resp = await axios.get("http://localhost:8000/api/users");
    let users = resp.data;
    return users;
}

const deleteUser = async(id) =>
{
    let resp = await axios.get("http://localhost:8000/api/users/deleteUser/" + id);
    let user = resp.data;
    return user;
}

const addUser = async(obj) =>
{
    let resp = await axios.post("http://localhost:8000/api/users/addUser" ,obj);
    let user = resp.data;
    return user;
}

const EditUser = async(id, obj) =>
{
    let resp = await axios.put("http://localhost:8000/api/users/EditUser/"+id ,obj);
    let movie = resp.data;
    return movie;
}

const userUtils = {allUsers, deleteUser,addUser, EditUser};
export default userUtils;
