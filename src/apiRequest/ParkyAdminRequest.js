import axios from 'axios'
import { defaultHeader, checkToken, handleError } from "./RequestsTool"

import { store, updateStatus, updateList } from "../stores/ParkyAdminStore"


class ParkyAdminRequest {

  get() {
    console.log("try get");
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/users?type=verified", { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          updateList(response.data.data);
          updateStatus("Normal", null);

        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }

  put(status) {
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.put("http://dev.api.parkyeip.com/admin/verification/" + store.current.id, {
        verified: status
      },
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();
          store.modal = false;
          store.current = {
            birthdate: null,
            city: null,
            created_at: "",
            email: "",
            firstname: "",
            id: 0,
            lastname: "",
            license_plate: {name: ""},
            phone_number: null,
            roles: [],
            updated_at: "",
            url_verification: null,
            username: "",
            verified: 0
        }
          //refreshList
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }

}

export default new ParkyAdminRequest();
