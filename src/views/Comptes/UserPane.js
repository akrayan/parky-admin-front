import React, {
  Component
} from 'react';
import './Comptes.css'
import {
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import { observer } from 'mobx-react'

import userStore from '../../stores/UserStore'
import { store, resetStore} from '../../stores/AccountStore';
import AddUser from './AddUser';
import EditUser from './EditUser';


const UserPane = observer(class UserPane extends Component {


  render() {
    return (
      <Row>
        <AddUser />
        <EditUser />
        <Col sm="12">
          <Button disabled={!userStore.state.permission.addUser} size="lg" color="primary"
            onClick={() => { resetStore(); store.modal = true}}
            style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginTop: 15, marginBottom: 10, textAlign: "center", pa: 10 }}>
            <i className="fa fa-plus"></i>&nbsp;Ajouter un utilisateur
                </Button>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Mail</th>
                <th>Role</th>
                <th>Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {
                store.usersList.map((user, i) => {
                  let date = new Date(user.created_at);
                  //console.log(user.birthdate);
                  return (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={user.id.toString()}
                      onClick={() => {
                        console.log(user)
                        store.user = user;
                        if (user.roles.length > 0) {
                          store.role = user.roles[0].name
                          store.roleId = user.roles[0].id
                          console.log(store.roleId)
                        }
                        store.editModal = true;
                      }}
                    >
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.roles.length > 0 ? user.roles[0].name : "N/A"}</td>
                      <td>{date.toLocaleDateString('fr-FR')}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>

        </Col>
      </Row>
    );
  }
});

export default UserPane;