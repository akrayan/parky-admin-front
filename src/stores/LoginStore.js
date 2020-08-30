import { observable, action } from 'mobx'

export var store = observable({
    mail: "",
    password: "",
    status: "Normal",
    errMsg: null,
    btnId:0,

});

export var restartLogin = action(() => {
    store.mail= ""
    store.password= ""
    store.status= "Normal"
    store.errMsg= null
    store.btnId=0
})

export var updateStatus = action((str, errMsg, btnId) => {
    store.status = str;
        store.errMsg = errMsg;
store.btnId= btnId;
});

export var updateMail = action((str) => {
    store.mail = str;
});

export var updatePassword = action((str) => {
    store.password = str;
});
