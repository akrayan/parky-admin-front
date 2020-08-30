import { observable, action } from 'mobx'
import { initPermission, PermissionsTabToObj } from './RoleStore'


class UserStore {
  state = observable({
    history: null,
    user: { username: "pseudotest" },
    permission: initPermission(false)
  });

  restart = action(() => {
    //this.state.history = null
    this.state.user = { username: "pseudotest" }
    this.state.permission = initPermission(false)
  })

  upadteUser = action(user => {
    user.roles = user.roles.filter((e) => e.id !== 2 );
    this.state.user = user;
    this.state.permission = PermissionsTabToObj(user.roles[0].permissions)
    //console.log(this.state.permission)
  });

}

export default new UserStore();
