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

import store from "../../stores/NewsStore"
import request from "../../apiRequest/NewsRequest"


import './News.css'
import userStore from '../../stores/UserStore';
import DateForm from "./DateForm"
import RequestButton from "../../components/RequestButton"

const confirmEdit = () => {
  store.upadteCheckEmpty();

  if (!store.state.emptyText && !store.state.emptyTitle && !store.state.emptyEndDate && !store.state.emptyEndHour &&
    !store.state.emptyStartDate && !store.state.emptyStartHour )//&& !store.state.emptyCity)
  {
    let i = 0;
    while (i < store.state.list.length && store.state.list[i].id !== store.state.currentNews.id)
      i++;
    if (i < store.state.list.length) {
      store.state.list[i].url = store.state.currentNews.url;
      store.state.list[i].title = store.state.currentNews.title;
      store.state.list[i].description = store.state.currentNews.description;
      store.state.editModal = false;
      if (store.state.oldurl !== store.state.currentNews.url) {
        request.postPicture(true);
      }
      else
        request.put();
    }
  }
}

const deleteNews = () => {
  if (window.confirm("Etes-vous sûr de vouloir supprimer cette actualité ?")) {
    let i = 0;
    while (i < store.state.list.length && store.state.list[i].id !== store.state.currentNews.id)
      i++;
    if (i < store.state.list.length) {
      store.state.editModal = false;
      request.delet()
    }
  }
}

const EditModal = observer(class EditModal extends Component {

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader >Editer une News</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label><strong>Titre</strong></Label>
            <Input disabled={!userStore.state.permission.editNews} type="text" invalid={store.state.emptyTitle} value={store.state.currentNews.title} onChange={(e) => store.state.currentNews.title = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>Description </strong></Label>
            <Input disabled={!userStore.state.permission.editNews} type="textarea" invalid={store.state.emptyText} value={store.state.currentNews.description} onChange={(e) => store.state.currentNews.description = e.target.value} rows={5} />
          </FormGroup>
          <DateForm />

          <FormGroup>

            <Label><strong>Ajouter une image </strong>(facultatif)</Label>
            <Input disabled={!userStore.state.permission.editNews} type="file" accept="image/png, image/jpeg" onChange={(e) => {
              store.state.currentNews.image = e.target.files[0]
              store.state.currentNews.url = URL.createObjectURL(e.target.files[0])
            }} />
            {store.state.currentNews.url !== "" && store.state.currentNews.url != null && <img className="imageBig" alt={"uploaded"} src={store.state.currentNews.url} />}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <RequestButton disabled={!userStore.state.permission.deleteNews} errorMsg={store.state.errMsg} status={store.state.status} btnId={store.state.btnId} id={1} color="danger" action={deleteNews}>Supprimer</RequestButton>{' '}
          <RequestButton disabled={!userStore.state.permission.editNews} errorMsg={store.state.errMsg} status={store.state.status} btnId={store.state.btnId} id={2} color="primary" action={confirmEdit}>Modifier</RequestButton>{' '}
          <Button color="secondary" onClick={this.props.toggle} >Annuler</Button>
        </ModalFooter>
      </Modal>
    )
  }
})

export default EditModal;














