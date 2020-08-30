import { observable, action } from 'mobx'
import userStore from './UserStore'

export var store = observable({
    activeTab: 0,//userStore.state.permission.readUser ? 0 : 1,
    usersList: [],
    modal: false,
    editModal: false,
    user: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        birthdate: "",
        firstname: "none",
        lastname: "none",
        phone_number: "none",
        license_plate: "none",
        role: "",
        roleId: -1,
    },
    role: "",
    roleId: 0,
    emptyUsername: false,
    emptyEmail: false,
    emptyPassword: false,
    invalidConfirmation: false,

    status: "Normal",
    errMsg: null,
    btnId: 0,
});



export var updateRoleUser= action((role) => {
    store.role = role.name;
    store.roleId = role.id;
});

export var updateStatus = action((str, errMsg, btnId) => {
    store.status = str;
    store.errMsg = errMsg;
    store.btnId = btnId;
});

export var updateUsersList = action((newlist) => {

    store.usersList = userListFromApi(newlist);
});


export function userListFromApi(listOfApi) {
    let res = [];

    listOfApi.forEach(element => {
        element.roles = element.roles.filter((e) => e.id !== 2 );
        res.push(element);
    });
    return (res);
}


export var checkIsEmpty = action(() => {
    store.emptyUsername = store.user.username === "";
    store.emptyEmail = store.user.email === "";
    store.emptyPassword = store.user.password === "";
    store.invalidConfirmation = store.user.password !== store.user.password_confirmation;
    return (store.emptyUsername || store.emptyEmail || store.emptyPassword || store.invalidConfirmation)
});

export var resetStore = action(() => {
    store.user = {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        birthdate: "",
        firstname: "none",
        lastname: "none",
        phone_number: "none",
        license_plate: "none",
        role: "",
        roleId: -1,
    }
});


export var restartAccount = action(() => {
    store.activeTab = userStore.state.permission.readUser ? 0 : 1
    store.usersList = []
    store.modal = false
    store.editModal = false
    store.user = {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        birthdate: "",
        firstname: "none",
        lastname: "none",
        phone_number: "none",
        license_plate: "none",
    }
    store.emptyUsername = false
    store.emptyEmail = false
    store.emptyPassword = false
    store.invalidConfirmation = false

    store.status = "Normal"
    store.errMsg = null
    store.btnId = 0
});


/*
    user: {
        username: "string",
        email: "string",
        password: "string",
        password_confirmation: "string",
        birthdate: "string",
        firstname: "string",
        lastname: "string",
        phone_number: "string",
        license_plate: "string",
    }
    */