import cookie from 'react-cookies'
import axios from 'axios'
import userStore from "../stores/UserStore"
import { store, updateStatus} from "../stores/LoginStore"

import { defaultHeader, handleError, checkToken } from "./RequestsTool"

class AuthRequest {

  get() {

    if (checkToken()) {
      //updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/user/me", { headers: defaultHeader })
        .then((response) => {
          console.log("hangouver");
          console.log(response.data);
          console.log("gouver");

          userStore.upadteUser(response.data);
          //store.upadteList(response.data.data);
        })
        .catch(handleError, [""])
    }
  }

  post() {

    axios.post("http://dev.api.parkyeip.com/admin/login", {
      email: store.mail,
      password: store.password,
    },
      { headers: defaultHeader })
      .then((response) => {
        console.log(response.data);
        cookie.save('userData', response.data.access_token, { path: '/' });
        userStore.upadteUser(response.data.user);
        updateStatus("Success", null);
        setTimeout(() => userStore.state.history.push('/'), 500);
      })
      .catch((error) => {
        updateStatus("Echec", "Mauvais identifiant ou mot de passe", 0);
        //handleError(error)
      });

  }

}

export default new AuthRequest();
