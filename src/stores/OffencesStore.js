import { observable, action } from 'mobx'
import moment from 'moment'

export var store = observable({
    list: [],
    yearList: [],
    monthList: [],
    weekList: [],
    dayList: [],
    sortOffence: 4,
    dropdown: false,

    status: "Normal",
    errMsg: null,
    btnId: 0,
});

export var restartOffences = action(() => {
    store.list = []
    store.yearList = []
    store.monthList = []
    store.weekList = []
    store.dayList = []
    store.sortOffence = 4
    store.dropdown = false

    store.status = "Normal"
    store.errMsg = null
    store.btnId = 0

})

export var updateStatus = action((str, errMsg, btnId) => {
    store.status = str;
    store.errMsg = errMsg;
    store.btnId = btnId;
});

export var updateOffences = action((newlist) => {
    store.list = newlist;
    store.yearList = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0)

    store.monthList = newlist.filter((e) => {
        return (moment().year() - moment(e.created_at).year() === 0 &&
            moment().month() - moment(e.created_at).month() === 0)
    })

    store.weekList = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
        moment().week() - moment(e.created_at).week() === 0)

    store.dayList = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
        moment().dayOfYear() - moment(e.created_at).dayOfYear() === 0)

    console.log(store.yearList)
    console.log(store.monthList)
    console.log(store.weekList)
    console.log(store.dayList)
});



console.log("stototor")
let d = moment().week() - moment("rdydyrdsz25/11/2019:uiiçgyig_gi", "DD/MM/YYYY").week();
console.log(d)
