import axios from 'axios'
import { updateTickets,  store, updateStatus } from "../stores/TicketsStore"
import { defaultHeader, checkToken, handleError } from "./RequestsTool"

class TicketsRequest {

  /*get() {
    console.log("try get");
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/", { headers: defaultHeader })
        .then((response) => {
          console.log(response);

        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }*/

  get() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/tickets", { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data)
          response.data.data.sort((a, b) => {
            let da = new Date(a.created_at), db = new Date(b.created_at);
            return (db.getTime() - da.getTime());
          })
          updateStatus("Normal", null);
          updateTickets(response.data.data)
          //sortTickets();

        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0]);
        });
    }
  }

  post() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.post("http://dev.api.parkyeip.com/admin/tickets", {
        status: 1,
        object: store.object,
        text: store.message2
      }, { headers: defaultHeader })
        .then((response) => {
          store.message2 = "";
          store.object = "";
          store.modal = !store.modal;
          console.log(response.data)
          store.tselect = response.data;
          this.get();
          //updateTickets(list)
        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }

  postMessage() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.post("http://dev.api.parkyeip.com/admin/tickets/" + store.tselect.id + "/messages", {
        text: store.message
      }, { headers: defaultHeader })
        .then((response) => {
          console.log(response.data)
          store.tselect.messages.push(response.data)
          this.get();
          //updateTickets(list)
        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 3);
        });
    }
  }

  put() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.put("http://dev.api.parkyeip.com/admin/tickets/" + store.tselect.id, {
        status: 0
      }, { headers: defaultHeader })
        .then((response) => {
          store.tselect = response.data;
          updateStatus("Normal", null);
          
        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 1);
        });
    }
  }
}

export default new TicketsRequest();
