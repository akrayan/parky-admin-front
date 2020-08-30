import { observable, action } from 'mobx'

export var store = observable({
    list: [],//listRegistred,
    modal: false,
    current : {
        birthdate: null,
        city: null,
        created_at: "",
        email: "",
        firstname: "",
        id: 0,
        lastname: "",
        license_plate: {name: ""},
        phone_number: null,
        roles: [],
        updated_at: "",
        url_verification: null,
        username: "",
        verified: 0
    },

    status: "Normal",
    errMsg: null,
    btnId: 0,
});


export var updateStatus = action((str, errMsg, btnId) => {
    store.status = str;
    store.errMsg = errMsg;
    store.btnId = btnId;
});

export var restartAdmin= action(() => {
    store.list = []
    store.current = {
        birthdate: null,
        city: null,
        created_at: "",
        email: "",
        firstname: "",
        id: 0,
        lastname: "",
        license_plate: {name: ""},
        phone_number: null,
        roles: [],
        updated_at: "",
        url_verification: null,
        username: "",
        verified: 0
    }
})

export var updateList = action((newlist) => {
    store.list = newlist;
});