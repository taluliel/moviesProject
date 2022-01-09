import axios from "axios";

const allMembers = async () => {
  let resp = await axios.get("http://localhost:8000/api/members");
  let members = resp.data;
  return members;
};
const getMember = async (id) => {
  let resp = await axios.get("http://localhost:8000/api/members/member/" + id);
  let member = resp.data;
  return member;
};
const deleteMember = async (id) => {
  await axios.get("http://localhost:8000/api/members/deleteMember/" + id);
  return allMembers();
};

const addMember = async (obj) => {
  await axios.post("http://localhost:8000/api/members/addMember", obj);
  return allMembers();
};

const EditMember = async (id, obj) => {
  await axios.post("http://localhost:8000/api/members/EditMember/" + id, obj);
  return allMembers();
};
const membersUtils = {
  allMembers,
  getMember,
  deleteMember,
  addMember,
  EditMember,
};
export default membersUtils;
