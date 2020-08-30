import { observable, action } from 'mobx'

export var roleStore = observable({
    listRole: [],//roleListFromApi(listRole),
    selectedRole: null,
    permission: initPermission(false),

    status: "Normal",
    errMsg: null,
    btnId:0,
});

export var restartRole = action(() => {
    roleStore.listRole = []
    roleStore.selectedRole = []
    roleStore.permission= initPermission(false)

    roleStore.status = "Normal"
    roleStore.errMsg = null
    roleStore.btnId = 0

})

export function initPermission(val) {
    return ({
        parky: val,

        addUser: val,
        deleteUser: val,
        editUser: val,
        readUser: val,

        addBollard: val,
        deleteBollard: val,
        editBollard: val,
        readBollard: val,

        addNews: val,
        deleteNews: val,
        editNews: val,
        readNews: val,

        addRole: val,
        deleteRole: val,
        editRole: val,
        readRole: val,

        addTicket: val,
        //deleteTicket: val,
        editTicket: val,
        readTicket: val,

        readOffence: val,
    });
}

export var updateStatus = action((str, errMsg, btnId) => {
    roleStore.status = str;
    roleStore.errMsg = errMsg;
    roleStore.btnId= btnId;
});

export var updateSelection = action((selected) => {
    roleStore.selectedRole = selected;
});

export var updateMail = action((str) => {
    roleStore.mail = str;
});

export var updatePassword = action((str) => {
    roleStore.password = str;
});

export var updateRoleList = action((newList) => {
    roleStore.listRole = roleListFromApi(newList)
    roleStore.selectedRole = roleStore.listRole[0]
});

export function roleListFromApi(listOfApi) {
    let res = [];

    listOfApi.forEach(element => {
        element.permissions = PermissionsTabToObj(element.permissions);
        res.push(element);
    });
    return (res);
}

export function PermissionsTabToObj(apiTab) {

    var permissions = initPermission(false);
    apiTab.forEach(perm => {
        //console.log(perm)
        //console.log(permissions)
        if (perm === "all-granted") permissions.parky = true;

        else if (perm === "add-users") permissions.addUser = true;
        else if (perm === "edit-users") permissions.editUser = true;
        else if (perm === "delete-users") permissions.deleteUser = true;
        else if (perm === "read-users") permissions.readUser = true;

        else if (perm === "add-bollards") permissions.addBollard = true;
        else if (perm === "edit-bollards") permissions.editBollard = true;
        else if (perm === "delete-bollards") permissions.deleteBollard = true;
        else if (perm === "read-bollards") permissions.readBollard = true;

        else if (perm === "add-news") permissions.addNews = true;
        else if (perm === "edit-news") permissions.editNews = true;
        else if (perm === "delete-news") permissions.deleteNews = true;
        else if (perm === "read-news") permissions.readNews = true;

        else if (perm === "add-roles") permissions.addRole = true;
        else if (perm === "edit-roles") permissions.editRole = true;
        else if (perm === "delete-roles") permissions.deleteRole = true;
        else if (perm === "read-roles") permissions.readRole = true;

        else if (perm === "add-tickets") permissions.addTicket = true;
        else if (perm === "edit-tickets") permissions.editTicket = true;
        //else if (perm === "delete-tickets") permissions.deleteTicket = true;
        else if (perm === "read-tickets") permissions.readTicket = true;

        else if (perm === "read-offences") permissions.readOffence = true;

    });
    return (permissions);
}

export var PermissionsObjToTab = ( perm) => {

    let apiTab = [];
    if (perm.addUser) apiTab.push("add-users");
    if (perm.editUser) apiTab.push("edit-users");
    if (perm.deleteUser) apiTab.push("delete-users");
    if (perm.readUser) apiTab.push("read-users");

    if (perm.addBollard) apiTab.push("add-bollards");
    if (perm.editBollard) apiTab.push("edit-bollards");
    if (perm.deleteBollard) apiTab.push("delete-bollards");
    if (perm.readBollard) apiTab.push("read-bollards");

    if (perm.addNews) apiTab.push("add-news");
    if (perm.editNews) apiTab.push("edit-news");
    if (perm.deleteNews) apiTab.push("delete-news");
    if (perm.readNews) apiTab.push("read-news");

    if (perm.addRole) apiTab.push("add-roles");
    if (perm.editRole) apiTab.push("edit-roles");
    if (perm.deleteRole) apiTab.push("delete-roles");
    if (perm.readRole) apiTab.push("read-roles");

    if (perm.addTicket) apiTab.push("add-tickets");
    if (perm.editTicket) apiTab.push("edit-tickets");
    //if (perm.deleteTicket) apiTab.push("delete-tickets");
    if (perm.readTicket) apiTab.push("read-tickets");

    if (perm.readOffence) apiTab.push("read-offences");

    apiTab.push("connect-admin");

    return apiTab;

}




/*


{
    "data": [
        {
            "id": 1,
            "name": "Administrator",
            "permissions": [
                "add-user",
                "edit-user",
                "delete-user",
                "add-bollard",
                "edit-bollard",
                "edit-STATUS_bollard",
                "delete-bollard",
                "add-news",
                "edit-news",
                "delete-news",
                "add-roles",
                "edit-roles",
                "delete-roles"
            ]
        },
        {
            "id": 2,
            "name": "Banned",
            "permissions": [
                "FORBIDDEN_LOGIN"
            ]
        }
    ]
}*/