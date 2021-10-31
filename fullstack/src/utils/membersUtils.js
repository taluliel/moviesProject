import axios from 'axios'

const allMembers = async() =>
{
    let resp = await axios.get("http://localhost:8000/api/members");
    let members = resp.data;
    return members;
}
const getMember = async(id) =>
{
    let resp = await axios.get("http://localhost:8000/api/members/member/" +id);
    let member = resp.data;
    return member;
}
const deleteMember = async(id) =>
{
    let resp = await axios.get("http://localhost:8000/api/members/deleteMember/" + id);
    let members = resp.data;
    return members;
}

const addMember = async(obj) =>
{
    let resp = await axios.post("http://localhost:8000/api/members/addMember" ,obj);
    let member = resp.data;
    return member;
}

const EditMember = async(id, obj) =>
{
    let resp = await axios.post("http://localhost:8000/api/members/EditMember/" + id ,obj);
    let member = resp.data;
    return member;
}
const membersUtils =  {allMembers,getMember, deleteMember, addMember, EditMember};
export default membersUtils;
