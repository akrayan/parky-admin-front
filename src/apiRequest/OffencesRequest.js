import axios from 'axios'
import { updateOffences, updateStatus } from "../stores/OffencesStore"
import {defaultHeader, checkToken, handleError} from "./RequestsTool"


class OffencesRequest {

  get() {
    console.log("try get");
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/offences", { headers: defaultHeader })
        .then((response) => {
          console.log(response);
          updateOffences(response.data.data);
          updateStatus("Normal", null);

        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }
/*
  put() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.put("http://dev.api.parkyeip.com/admin/news/" + store.state.currentNews.id, {
        title: store.state.currentNews.title,
        description: store.state.currentNews.description,
        url: store.state.currentNews.url,
      },
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          this.get();

          //refreshList
        })
                .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }*/

}

export default new OffencesRequest();
