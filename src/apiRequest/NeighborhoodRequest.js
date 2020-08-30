import axios from 'axios'
import { store, updateNeighborhood, updateStatus } from "../stores/BollardStore"
import { defaultHeader, checkToken, handleError } from "./RequestsTool"


class NeighborhoodRequest {

  get() {

    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/neighborhoods", { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          updateNeighborhood(response.data.data);
          updateStatus("Normal", null);
        })
        .catch((error) => {
          let e = "";
          handleError(error, [e])
          updateStatus("Echec", e[0]);
          //
        });
    }
  }

  post() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.post("http://dev.api.parkyeip.com/admin/neighborhoods/", {
        name: "Nouveau Quartier",
      },
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          store.selectedN = response.data
          this.get();

          //refreshList
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }

  put(newBollards = null) {
    console.log(store.selectedN.bollards.slice())
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.put("http://dev.api.parkyeip.com/admin/neighborhoods/" + store.selectedN.id, {
        name: store.selectedN.name,
        price: parseFloat(store.selectedN.price),
        bollards: newBollards == null ? store.selectedN.bollards.slice() : newBollards.slice(),
      },
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          store.selectedN = response.data;
          if (newBollards != null)
            store.selectionMode = false;
          this.get();

          //refreshList
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 1);
        });
    }
  }

  delet() {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.delete("http://dev.api.parkyeip.com/admin/neighborhoods/" + store.selectedN.id,
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);

          this.get();
          store.selectedN = null;
          //refreshList
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 2);
        });
    }
  }
}

export default new NeighborhoodRequest();
