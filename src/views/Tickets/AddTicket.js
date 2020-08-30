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

import {store, upadteCheckEmpty} from '../../stores/TicketsStore'
import userStore from '../../stores/UserStore'
import request from "../../apiRequest/TicketsRequest"
import RequestButton from "../../components/RequestButton"


const AddTicket = observer(class AddTicket extends Component {

  createTicket = () => {

    upadteCheckEmpty();
    if (!store.emptyText && !store.emptyTitle) {
      request.post();
      /*store.list.splice(0, 0, {
        id: store.list.length,
        object: store.object,
        status: 1,
        messages: [
          {
            author: userStore.state.user.username,
            text: store.message2,
            date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            hour: date.getHours() + "h" + date.getMinutes(),
          },
        ]
      }
      )
      store.tselect = store.list[0];
      store.message2 = "";
      store.object = "";
      store.modal = !store.modal;*/
    }
  }

  render() {
    return (
      <Modal isOpen={store.modal}>
        <ModalHeader >Créer un ticket</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label><strong>Sujet</strong></Label>
            <Input type="text" invalid={store.emptyTitle} value={store.object} onChange={(e) => store.object = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>Message</strong></Label>
            <Input type="textarea" invalid={store.emptyText} value={store.message2} onChange={(e) => store.message2 = e.target.value} rows={5} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <RequestButton disabled={!userStore.state.permission.addTicket} errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={0} color="primary" action={this.createTicket}>Créer ce ticket</RequestButton>{' '}
          <Button color="secondary" onClick={() => {

            store.modal = false
          }
          }>Annuler</Button>
        </ModalFooter>
      </Modal>
    )
  }
})

export default AddTicket;














