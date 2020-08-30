import axios from 'axios'
import { store, updateUsersList, resetStore, updateStatus } from "../stores/AccountStore"
import { defaultHeader, checkToken, handleError } from "./RequestsTool"
import userStore from "../stores/UserStore"


class UsersRequest {

  get() {

    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/users?type=admin", { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          updateUsersList(response.data.data);
          updateStatus("Normal", null);

        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0]);
        });
    }
  }

  post() {
    console.log("try post")
    //console.log(store.user.birthdate)
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.post("http://dev.api.parkyeip.com/admin/users", {
        city: userStore.state.user.city,
        username: store.user.username,
        email: store.user.email,
        password: store.user.password,
        password_confirmation: store.user.password_confirmation,
        birthdate: null,//store.user.birthdate.toString(),
        firstname: "none",
        lastname: "none",
        phone_number: "none",
        roles: [store.roleId],
      }, { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          store.modal = !store.modal;
          resetStore();
          this.get();
          //refreshList();
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 0);
        });
    }
  }


  put() {
    console.log(store.roleId)

    if (checkToken()) {
      updateStatus("Loading", null);
      axios.put("http://dev.api.parkyeip.com/admin/users/" + store.user.id, {
        roles: [store.roleId, 2],
      },
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();
          store.editModal = false;

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
      axios.delete("http://dev.api.parkyeip.com/admin/users/" + store.user.id,
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          this.get();
          store.editModal = false;
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

export default new UsersRequest();
