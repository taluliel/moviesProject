import axios from "axios";

const allUsers = async () => {
  let resp = await axios.get("http://localhost:8000/api/users");
  let users = resp.data;
  return users;
};

const deleteUser = async (id) => {
  await axios.get("http://localhost:8000/api/users/deleteUser/" + id);
  return allUsers();
};

const addUser = async (obj) => {
  await axios.post("http://localhost:8000/api/users/addUser", obj);
  return allUsers();
};

const EditUser = async (id, obj) => {
  await axios.put("http://localhost:8000/api/users/EditUser/" + id, obj);
  return allUsers();
};

const userUtils = { allUsers, deleteUser, addUser, EditUser };
export default userUtils;
