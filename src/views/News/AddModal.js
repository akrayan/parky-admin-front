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
//registerLocale("fr", fr);

import store from "../../stores/NewsStore"
import request from "../../apiRequest/NewsRequest"
import './News.css'
import DateForm from "./DateForm"
import RequestButton from "../../components/RequestButton"
import userStore from "../../stores/UserStore"


const AddModal = observer(class AddModal extends Component {

  addNews() {

    store.upadteCheckEmpty();
    //store.state.emptyCity = store.state.currentNews.city_name === "";
    if (!store.state.emptyText && !store.state.emptyTitle &&
      !store.state.emptyEndDate && !store.state.emptyEndHour)//&& !store.state.emptyCity)
    {
      /*let n = store.state.currentNews;
      store.state.currentNews.events = [{
        event_start: n.dateStart.day+"/"+n.dateStart.month+"/"+n.dateStart.year+"-"+n.hourStart.hour+":"+n.hourStart.minute,
        event_end: n.dateEnd.day+"/"+n.dateEnd.month+"/"+n.dateEnd.year+"-"+n.hourEnd.hour+":"+n.hourEnd.minute,
        event_date: "",
      }];*/
      //list.push(store.state.currentNews);
      store.state.modal = !store.state.modal;
      if (store.state.currentNews.url !== "") {
        request.postPicture(false);
      }
      else
        request.post();
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader >Ajouter une News</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label><strong>Titre</strong></Label>
            <Input type="text" invalid={store.state.emptyTitle} value={store.state.currentNews.title} onChange={(e) => store.state.currentNews.title = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label><strong>Description </strong></Label>
            <Input type="textarea" invalid={store.state.emptyText} value={store.state.currentNews.description} onChange={(e) => store.state.currentNews.description = e.target.value} rows={5} />
          </FormGroup>

          <DateForm/>



          <FormGroup>
            <Label><strong>Ajouter un lien vers une image </strong>(facultatif)</Label>
            <Input type="file" accept="image/png, image/jpeg" onChange={(e) => {
              store.state.currentNews.image = e.target.files[0]
              store.state.currentNews.url = URL.createObjectURL(e.target.files[0])
            }} />
            {store.state.currentNews.url !== "" && store.state.currentNews.url != null && <img className="imageBig" alt={"uploaded"} src={store.state.currentNews.url} />}
          </FormGroup>


        </ModalBody>
        <ModalFooter>
          <RequestButton disabled={!userStore.state.permission.addNews} errorMsg={store.state.errMsg} status={store.state.status} btnId={store.state.btnId} id={0} color="primary" action={this.addNews}>Ajouter</RequestButton>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Annuler</Button>
        </ModalFooter>
      </Modal>
    )
  }
})

export default AddModal;














