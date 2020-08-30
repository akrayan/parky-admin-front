import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  Col,
  Row,
} from 'reactstrap';
import { observer } from 'mobx-react'

import { store } from "../../stores/ParkyAdminStore"
import RequestButton from "../../components/RequestButton"

import "./ParkyAdmin.css"
import request from '../../apiRequest/ParkyAdminRequest';


const AdminModal = observer(class AdminModal extends Component {

  render() {
    //  if (store.current != null)
    return (
      <Modal isOpen={store.modal} toggle={() => store.modal = false}>
        <ModalBody>
          <div><strong>Pseudo :</strong> {store.current.username}</div>
          <div><strong>E-mail :</strong> {store.current.email}</div>
          <div><strong>Date de naissance :</strong> {store.current.birthdate}</div>
          <div><strong>Prénom :</strong> {store.current.firstname}</div>
          <div><strong>Nom de famille :</strong> {store.current.lastname}</div>
          <div><strong>Numéro de téléphone :</strong> {store.current.phone_number}</div>
          <div><strong>Plaque d'immatriculation :</strong> {store.current.license_plate.name}</div>
  
        </ModalBody>
      <img className="imageModal" alt={"img "} src={store.current.url_verification} />
      <Row >
        <Col className='pr-0'><RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={0} text={"Accepter"} action={() => request.put(2)} style={{ borderRadius: 0, borderBottomLeftRadius: 3, }} color="primary" block/></Col>
        <Col className='pl-0'><RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={0} text={"Rejeter"} action={() => request.put(0)} style={{ borderRadius: 0, borderBottomRightRadius: 3, }} color="danger" block/></Col>
      </Row>
      </Modal >
    )
    //else
    //return (<div />);
  }
})

export default AdminModal;

/*
birthdate: null
city: null
created_at: "2019-11-28T22:17:00.000000Z"
email: "parkyeip@gmail.com"
firstname: "Parky"
id: 19
lastname: "EIP"
license_plate: null
phone_number: null
roles: [{…}]
updated_at: "2019-11-28T22:17:00.000000Z"
url_verification: null
username: "parkyeip@gmail.com"
verified: 0
*/












