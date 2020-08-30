import axios from 'axios'
import store from "../stores/DashboardStore"

import { defaultHeader, handleError, checkToken } from "./RequestsTool"

class AuthRequest {

  async get() {

    if (checkToken()) {
      //updateStatus("Loading", null);
      await axios.get("http://dev.api.parkyeip.com/admin/neighborhoods", { headers: defaultHeader })
        .then((response) => {
          console.log("quartier");
          //console.log(response.data.data);
          store.upadteNeighbor(response.data.data)
        })
        .catch(handleError, [""])
      await axios.get("http://dev.api.parkyeip.com/admin/news", { headers: defaultHeader })
        .then((response) => {
          console.log("news");
          //console.log(response.data.data);
          store.upadteEvent(response.data.data)
        })
        .catch(handleError, [""])
        await axios.get("http://dev.api.parkyeip.com/admin/offences", { headers: defaultHeader })
        .then((response) => {
          console.log("offence");
          console.log(response.data.data);
          store.upadteOffence(response.data.data)
        })
        .catch(handleError, [""])
      await axios.get("http://dev.api.parkyeip.com/admin/tickets", { headers: defaultHeader })
        .then((response) => {
          console.log("ticket");
          //console.log(response.data.data);
          store.upadteTicket(response.data.data)
        })
        .catch(handleError, [""])
    }
  }


}

export default new AuthRequest();
