import axios from 'axios'
import { roleStore, updateRoleList, PermissionsTabToObj, PermissionsObjToTab, updateStatus } from "../stores/RoleStore"
import { store } from "../stores/AccountStore"
import { defaultHeader, checkToken, handleError } from "./RequestsTool"


class RolesRequest {

  get() {

    if (checkToken()) {
      updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/roles", { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          updateRoleList(response.data.data)
          store.role = response.data.data[0].name
          store.roleId = response.data.data[0].id
          updateStatus("Normal", null);
          //updateUsersList(response.data.data);
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
      axios.post("http://dev.api.parkyeip.com/admin/roles", {
        name: "Nouveau rôle",
        permissions: ["connect-admin"],
      }, { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();
          roleStore.selectedRole = response.data;
          roleStore.selectedRole.permissions = PermissionsTabToObj(roleStore.selectedRole.permissions);
          //updateStatus("Normal", null);

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
    console.log("try put")
    //console.log(store.user.birthdate)
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.put("http://dev.api.parkyeip.com/admin/roles/" + roleStore.selectedRole.id, {
        name: roleStore.selectedRole.name,
        permissions: PermissionsObjToTab(roleStore.selectedRole.permissions),
      }, { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();
          roleStore.selectedRole = response.data;
          roleStore.selectedRole.permissions = PermissionsTabToObj(roleStore.selectedRole.permissions);
          //refreshList();
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 1);
        });
    }
  }

  delet() {
    console.log("try del")
    //console.log(store.user.birthdate)
    if (checkToken()) {
      updateStatus("Loading", null);
      axios.delete("http://dev.api.parkyeip.com/admin/roles/" + roleStore.selectedRole.id, { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();
          //roleStore.selectedRole = response.data;
          //roleStore.selectedRole.permissions = PermissionsTabToObj(roleStore.selectedRole.permissions);
          //refreshList();
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          updateStatus("Echec", e[0], 2);
        });
    }
  }

  /*
    put() {
      if (checkToken()) {
        axios.put("http://dev.api.parkyeip.com/admin/users/" + store.state.currentNews.id, {
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
            updateStatus("Echec", e[0]);
          });
      }
    }
  */
}

export default new RolesRequest();
