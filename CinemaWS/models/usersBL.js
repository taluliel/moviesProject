const User= require('../DALS/usersDAL')

exports.getAllUsersData = async function () {
    try {
        let users = await User.getAllUsers();
        let Permissions = await User.getAllPermissions();
        let usersDB = await User.getUsersDB();
        let allUsers = [];
        usersDB.forEach(element => {
            let user = users.find(x => x.Id == element._id)
            let per = Permissions.find(x => x.Id == element._id)
            let obj = {
                id: element._id,
                userName: element['_doc'].userName,
                password: element['_doc'].password,
                FirstName: user.FirstName,
                LastName: user.LastName,
                CreatedDate: user.CreatedDate,
                Permissions: per.Permissions,
                Role: element['_doc'].userName=="admin"? "admin" : "user"
            }
            allUsers.push(obj)
        });
        return allUsers;

    }
    catch (err) {
        return err;
    }
}


exports.deleteUser = async function (id) {
    try {
        let deleteFromDB = await User.deleteUser(id);
        let AllUsers = await User.getAllUsers();
        let users = await User.deleteUserJson(AllUsers, id);
        let AllPermission = await User.getAllPermissions();
        let Permissions = await User.deletepermissionJson(AllPermission, id);

        if (deleteFromDB && users && Permissions) {
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return err;
    }

}

exports.addUser = async function (obj) {
    try {
        let id = await User.addUser(obj);
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let userJson = {
            "Id": id,
            "FirstName": obj.FirstName,
            "LastName": obj.LastName,
            "CreatedDate": date,
            "SessionTimeOut": obj.SessionTimeOut
        }
        let AllUsers = await User.getAllUsers();
        AllUsers.push(userJson);
        let respUser = await User.addUserJson(AllUsers);
        let PermissionJson = {
            "Id": id,
            "Permissions": obj.Permissions
        }
        let AllPermission = await User.getAllPermissions();
        AllPermission.push(PermissionJson);
        let respPermission = await User.addPermissionsJson(AllPermission);

        if (respUser && respPermission) {
            return true;
        }
        else {
            return false;
        }

    }
    catch (err) {
        return err;
    }
}


exports.EditUser = async function (obj) {
    try {
        let id=obj.id;
        let userUpdate = await User.updateUser(id, obj);

        let AllUsers = await User.getAllUsers();
        let indexU = AllUsers.findIndex(x => x.Id == id);
        let userJson = {
            "Id": id,
            "FirstName": obj.FirstName,
            "LastName": obj.LastName,
            "CreatedDate": AllUsers[indexU].CreatedDate
        }

        if (indexU >= 0) { AllUsers[indexU] = userJson; }
        let respUser = await User.addUserJson(AllUsers);

        let PermissionJson = {
            "Id": id,
            "Permissions": obj.Permissions
        }
        let AllPermission = await User.getAllPermissions();
        let indexP = AllPermission.findIndex(x => x.Id ==id);
        if (indexP >= 0) { AllPermission[indexP] = PermissionJson; }
        let respPermission = await User.addPermissionsJson(AllPermission);

        if (respUser && respPermission) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return err;
    }
}

exports.checkUser = async function (username) {
    try {
        let obj = await User.checkUser(username);
        if (obj) {
            return obj;
        }
        else {
            return false;
        }

    }
    catch (err) {
        return err;
    }
}

exports.Updateuser = async function (id, obj) {
    try {
        let userUpdate = await User.updateUserPass(id, obj);
        if (userUpdate) {
            return true;
        }
        else {
            return false;
        }

    }
    catch (err) {
        return err;
    }
}