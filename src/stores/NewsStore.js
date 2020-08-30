import { observable, action } from 'mobx'
import { toDateString, toHourString } from '../ToolsJS'

class NewsStore {
  state = observable({
    image: null,
    modal: false,
    editModal: false,
    emptyText: false,
    emptyEndDate: false,
    emptyEndHour: false,
    emptyStartDate: false,
    emptyStartHour: false,
    emptyCity: false,
    emptyTitle: false,
    oldurl: "",
    list: [],
    currentNews: {
      title: "string",
      description: "string",
      url: "string",

      event: {
        date_start: null,
        date_end: null,
        hour_start: null,
        hour_end: null,
      }
    },

    status: "Normal",
    errMsg: null,
    btnId: 0,
  });

  restart = action(() => {
    this.state.image = null
    this.state.modal = false
    this.state.editModal = false
    this.state.emptyText = false
    this.state.emptyEndDate = false
    this.state.emptyEndHour = false
    this.state.emptyStartDate = false
    this.state.emptyStartHour = false

    this.state.emptyCity = false
    this.state.emptyTitle = false
    this.state.oldurl = ""
    this.state.list = []
    this.state.currentNews = {
      title: "string",
      description: "string",
      url: "string",

      event: {
        date_start: null,
        date_end: null,
        hour_start: null,
        hour_end: null,
      }
    }

    this.state.status = "Normal"
    this.state.errMsg = null
    this.state.btnId = 0
  })

  updateStatus = action((str, errMsg) => {
    this.state.status = str;
    this.state.errMsg = errMsg;
  });

  prepareevent = action(() => {
    if (this.state.currentNews.dateStart != null) {
      this.state.currentNews.event = [
        {
          event_start: toDateString(this.state.currentNews.dateStart, '-', true),
          event_end: toDateString(this.state.currentNews.dateEnd, '-', true),
          event_date: toDateString(this.state.currentNews.dateStart, '-', true),
        }
      ]
      if (this.state.currentNews.hourStart != null) {
        this.state.currentNews.event[0].event_start += " " + toHourString(this.state.currentNews.hourStart, ':', true);
        this.state.currentNews.event[0].event_end += " " + toHourString(this.state.currentNews.hourEnd, ':', true);
      }
    }
    else
      this.state.currentNews.event = []
  })

  upadteCheckEmpty = action(() => {
    this.state.emptyText = this.state.currentNews.description === "";
    this.state.emptyTitle = this.state.currentNews.title === "";
    //this.state.emptyEndDate = this.state.currentNews.dateStart != null && this.state.currentNews.dateEnd == null;
    //this.state.emptyEndHour = this.state.currentNews.hourStart != null && this.state.currentNews.hourEnd == null;

    this.state.emptyStartDate = this.state.currentNews.event.date_start == null &&
      (this.state.currentNews.event.date_end != null || this.state.currentNews.event.hour_start != null || this.state.currentNews.event.hour_end != null);

    this.state.emptyEndDate = this.state.currentNews.event.date_end == null &&
      (this.state.currentNews.event.date_start != null || this.state.currentNews.event.hour_start != null || this.state.currentNews.event.hour_end != null);

    this.state.emptyStartHour = this.state.currentNews.event.hour_start == null &&
      (this.state.currentNews.event.date_end != null || this.state.currentNews.event.date_start != null || this.state.currentNews.event.hour_end != null);

    this.state.emptyEndHour = this.state.currentNews.event.hour_end == null &&
      (this.state.currentNews.event.date_end != null || this.state.currentNews.event.hour_start != null || this.state.currentNews.event.date_end != null);

    //this.state.emptyDate = this.state.currentNews.dateStart != null &&
     // (this.state.currentNews.dateEnd == null || this.state.currentNews.hourStart == null || this.state.currentNews.hourEnd == null);

  });
  upadteList = action(newlist => {
    newlist.forEach(element => {
      if (element.event == null) element.event = { date_start: null, date_end: null, hour_start: null, hour_end: null, }
    });
    this.state.list = newlist;
  });
  upadtePicUrl = action(newurl => this.state.currentNews.url = newurl);

}

export default new NewsStore();


//12/12/2019-12:12
//d.day+"/"+d.month+"/"+d.year+"-"+d.hour+":"+d.minute

/*
if (event.lenght > 0)
{
dateStart = new Date(event[0].event_start);
hourStart = new Date(event[0].event_start);
dateEnd = new Date(event[0].event_end);
hourEnd = new Date(event[0].event_end);
}
else
{
        dateStart: null,
      dateEnd: null,
      hourStart: null,
      hourEnd: null,
}



*/