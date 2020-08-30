import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from 'reactstrap';
import { observer } from 'mobx-react'

import { store, checkIsEmpty} from '../../stores/AccountStore'
import { roleStore } from '../../stores/RoleStore'
import request from '../../apiRequest/UsersRequest'
import RequestButton from "../../components/RequestButton"


const AddUser = observer(class AddUser extends Component {

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = '' + (d.getHours()),
      minute = '' + (d.getMinutes()),
      second = '' + (d.getSeconds());

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    if (hour.length < 2)
      hour = '0' + hour;
    if (minute.length < 2)
      minute = '0' + minute;
    if (second.length < 2)
      second = '0' + second;

    let dato = [year, month, day].join('-');
    let hours = [hour, minute, second].join(':');
    return (dato + " " + hours);
  }


  addUser = () => {
    store.user.birthdate = this.formatDate(Date.now());
    if (!checkIsEmpty()) {
      //store.modal = !store.modal;
      request.post();
    }
  }

  render() {
    return (
      <Modal isOpen={store.modal}>
        <ModalHeader >Ajouter un utilisateur</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label><strong>Nom d'utilisateur</strong></Label>
            <Input type="text" invalid={store.emptyUsername} value={store.user.username} onChange={(e) => store.user.username = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>E-mail</strong></Label>
            <Input type="text" invalid={store.emptyEmail} value={store.user.email} onChange={(e) => store.user.email = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>Mot de passe</strong></Label>
            <Input type="password" invalid={store.emptyPassword} value={store.user.password} onChange={(e) => store.user.password = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>Confirmation du mot de passe</strong></Label>
            <Input type="password" invalid={store.invalidConfirmation} value={store.user.password_confirmation} onChange={(e) => store.user.password_confirmation = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label ><strong>Role</strong></Label>
            <Input type="select" value={store.roleId + " : " + store.role} onChange={(e) => {
              console.log(e.target.value);
              let d = e.target.value.split(" : ");
              console.log(d)
              store.roleId = parseInt(d[0]);
              store.role = d[1];
              //store.roleId = updateRoleUser(roleStore.listRole.find((m) => m.name === e.target.value))
            }}>
              {
                roleStore.listRole.map((item, id) => <option key={id.toString()}>{item.id + " : " + item.name}</option>)
              }
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={0} color="primary" action={this.addUser}>Ajouter</RequestButton>{' '}
          <Button color="secondary" onClick={() => { store.modal = false }}>Annuler</Button>
        </ModalFooter>
      </Modal>
    )
  }
})

export default AddUser;














