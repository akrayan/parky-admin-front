import { observable, action } from 'mobx'
//import tlist from '../views/Dashboard/fakedata'

export var store = observable({

    selected: 0,
    tselect: null,
    object: "",
    message: "",
    message2: "",
    emptyText: false,
    emptyText2: false,
    emptyObject: false,
    modal: false,
    dropdownOffences: false,
    sortOffence: 0,
    list: [],// tlist

    status: "Normal",
    errMsg: null,
    btnId: 0,
});

export var restartTickets = action(() => {
    store.selected= 0
    store.tselect= null
    store.object= ""
    store.message= ""
    store.message2= ""
    store.emptyText= false
    store.emptyText2= false
    store.emptyObject= false
    store.modal= false
    store.dropdownOffences= false
    store.sortOffence= 0
    store.list= []

    store.status = "Normal"
    store.errMsg = null
    store.btnId = 0

})

export var updateStatus = action((str, errMsg, btnId) => {
    store.status = str;
    store.errMsg = errMsg;
    store.btnId = btnId;
});

export var sortTickets = action(() => {
    store.list.sort((a, b) => {
        let da = new Date(a.created_at), db = new Date(b.created_at);
        console.log(da)
        return (db.getTime() - da.getTime());

    })
});

export var upadteCheckEmpty = action(() => {
    store.emptyText2 = store.message2 === "";
    store.emptyObject = store.object === "";
});

export var updateTickets = action((newlist) => {
    store.list = newlist;

});