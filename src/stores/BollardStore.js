import { observable, action } from 'mobx'


export var notObserved = {
    currentZoom: [15],
    currentMap: null,
};

export var store = observable({
    status: "Normal",
    errMsg: null,
    btnId:0,

    bobool: false,
    selectedN: null,
    listNeighborhood: [],//listNeighborhood,
    list: [],
    listFree: [],
    freeCopy: [],
    selectedCopy: [],
    selectionMode: false
});

export var updateStatus = action((str, errMsg, btnId) => {
    store.status = str;
        store.errMsg = errMsg;
store.btnId= btnId;
});

export var updateList = action((newlist) => {
    store.list = newlist;

});

export var updateNeighborhood = action((newlist) => {
    store.listNeighborhood = newlist;
    store.listFree = (newlist.find(elem => elem.id === 0)).bollards;

});

export var copyList = action(() => {
    store.selectedCopy = store.selectedN.bollards.slice();
    store.freeCopy = store.listFree.slice();
    /*store.selectedN.bollards.forEach(element => {
        store.selectedCopy.push(element);
    });
    store.listFree.forEach(element => {
        store.freeCopy.push(element);
    });*/
});

export var pushInFree = action((bollard, i) => {
    store.selectedCopy.splice(i, 1);
    store.freeCopy.push(bollard);
});

export var pushInSelected = action((bollard, i) => {
    store.freeCopy.splice(i, 1);
    store.selectedCopy.push(bollard);
});

export var updatePrice = action((id, newPrice) => {
    let i = -1;
    while (++i < store.list.length && store.list[i].id !== id);
    if (i < store.list.length) store.list[i].price = newPrice;
});

export var restartBollard = action(() => {
    store.bobool= false
    store.selectedN= null
    store.listNeighborhood= []//listNeighborhood,
    store.list= []
    store.listFree= []
    store.freeCopy= []
    store.selectedCopy= []
    store.selectionMode= false

    store.status= "Normal"
    store.errMsg= null
    store.btnId=0
});