import { observable, action } from 'mobx'
import tlist from '../views/Dashboard/fakedata'
import moment from 'moment'
const sortOffencesBy = ["du jour", "de la semaine", "du mois", "de l'année", "tous"];
const nbOffences = [5, 23, 137, 1809]



class DashboardStore {

  state = observable({
    nbNeighborhoods: 0,
    nbBollards: 0,
    nbOffences: 0,
    nbProblems: 0,
    nbEvents: 0,
    nbTickets: 0,
    nbActifTickets: 0,

    offData: [
      { inf: 0, prob: 0 },
      { inf: 0, prob: 0 },
      { inf: 0, prob: 0 },
      { inf: 0, prob: 0 },
      { inf: 0, prob: 0 },
    ],

    dropdownOffences: false,
    sortOffence: 4,
    list: tlist
  });

  upadteNeighbor = action((list) => {
    this.state.nbNeighborhoods = list.length - 1;
    this.state.nbBollards = 0;
    list.forEach(element => {
      this.state.nbBollards += element.bollards.length
    });
  });

  upadteOffence = action((newlist) => {
    this.state.offData[4].inf = newlist.filter((e) => e.infraction === 1).length;
    this.state.offData[4].prob = newlist.filter((e) => e.infraction === 0).length;

    this.state.offData[3].inf = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 && e.infraction === 1).length;
    this.state.offData[3].prob = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 && e.infraction === 0).length;

    this.state.offData[2].inf = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
      moment().month() - moment(e.created_at).month() === 0 && e.infraction === 1).length;
    this.state.offData[2].prob = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
      moment().month() - moment(e.created_at).month() === 0 && e.infraction === 0).length;

    this.state.offData[1].inf = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
      moment().week() - moment(e.created_at).week() === 0 && e.infraction === 1).length;
    this.state.offData[1].prob = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
      moment().week() - moment(e.created_at).week() === 0 && e.infraction === 0).length;

    this.state.offData[0].inf = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
      moment().dayOfYear() - moment(e.created_at).dayOfYear() === 0 && e.infraction === 1).length
    this.state.offData[0].prob = newlist.filter((e) => moment().year() - moment(e.created_at).year() === 0 &&
      moment().dayOfYear() - moment(e.created_at).dayOfYear() === 0 && e.infraction === 0).length
  });

  upadteEvent = action((list) => {
    this.state.nbEvents = 0;
    list.forEach(element => {
      if (element.event && (new Date(element.event.date_end)).getTime() - Date.now() > 0)
        this.state.nbEvents += 1;
    });
  });

  upadteTicket = action((list) => {
    this.state.nbTickets = list.length;
    this.state.nbActifTickets = 0;
    list.forEach(element => {
      this.state.nbActifTickets += element.status;
    });
  });

  restart = action(() => {
    this.state.dropdownOffences = false
    this.state.sortOffence = 0
    this.state.list = tlist
  });

  upadteCheckEmpty = action(() => {
    this.state.emptyText2 = this.state.message2 === "";
    this.state.emptyObject = this.state.object === "";
  });

  getNbOffences() {
    return nbOffences[this.state.sortOffence];
  }

  getSortOffencesBy() {
    return sortOffencesBy[this.state.sortOffence];
  }
}

export default new DashboardStore();
