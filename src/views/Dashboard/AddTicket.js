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

import store from '../../stores/DashboardStore'
import userStore from '../../stores/UserStore'


const AddTicket = observer(class AddTicket extends Component {

  createTicket = () => {
    let date = new Date(Date.now());

    store.upadteCheckEmpty();
    if (!store.state.emptyText && !store.state.emptyTitle) {
      store.state.list.splice(0, 0, {
        id: store.state.list.length,
        object: store.state.object,
        messages: [
          {
            author: userStore.state.user.username,
            text: store.state.message2,
            date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            hour: date.getHours() + "h" + date.getMinutes(),
          },
        ]
      }
      )
      store.state.tselect = store.state.list[0];
      store.state.message2 = "";
      store.state.object = "";
      store.state.modal = !store.state.modal;
    }
  }

  render() {
    return (
      <Modal isOpen={store.state.modal}>
        <ModalHeader >Créer un ticket</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label><strong>Sujet</strong></Label>
            <Input type="text" invalid={store.state.emptyTitle} value={store.state.object} onChange={(e) => store.state.object = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>Message</strong></Label>
            <Input type="textarea" invalid={store.state.emptyText} value={store.state.message2} onChange={(e) => store.state.message2 = e.target.value} rows={5} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createTicket}>Créer ce ticket</Button>{' '}
          <Button color="secondary" onClick={() => {

            store.state.modal = false
          }
          }>Annuler</Button>
        </ModalFooter>
      </Modal>
    )
  }
})

export default AddTicket;














