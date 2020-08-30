import React, {
  Component
} from 'react';
import './Comptes.css'
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from "reactstrap";
import { observer } from 'mobx-react'

import { store} from '../../stores/AccountStore';
import userStore  from "../../stores/UserStore"
import usersRequest from '../../apiRequest/UsersRequest'
import rolesRequest from '../../apiRequest/RolesRequest'

import RolePane from './RolePane'
import UserPane from './UserPane';


const Accounts = observer(class Accounts extends Component {

  constructor(props) {
    super(props)
    userStore.state.history = this.props.history;
    //roleStore.selectedRole = roleStore.listRole[0];
    usersRequest.get();
    rolesRequest.get();
   
    //store.activeTab = userStore.state.permission.readUser ? 0 : 1
  }

  render() {
    return (
      <div className="animated fadeIn" >
        <Nav tabs>
          <NavItem>
            <NavLink
              disabled={!userStore.state.permission.readUser}
              active={userStore.state.permission.readUser && store.activeTab === 0}
              onClick={() => { store.activeTab = 0 }}
            >
              Utilisateurs
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={!userStore.state.permission.readRole}
              active={!userStore.state.permission.readUser || store.activeTab === 1}
              onClick={() => { store.activeTab = 1 }}
            >
              Roles
          </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={"" + store.activeTab}>
          <TabPane tabId="0">
            <UserPane/>
          </TabPane>
          <TabPane tabId="1">
            <RolePane />
          </TabPane>
        </TabContent>
      </div >
    );
  }
});

export default Accounts;
