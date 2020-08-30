
import React, { Component } from 'react';
import {  Row, Col,  Card, CardBody } from 'reactstrap';
import { observer } from 'mobx-react'

import request from "../../apiRequest/ParkyAdminRequest"
import { store } from "../../stores/ParkyAdminStore"
import AdminModal from "./AdminModal"
import userStore from "../../stores/UserStore"


import "./ParkyAdmin.css"


const ParkyAdmin = observer(class ParkyAdmin extends Component {

  constructor(props) {
    super(props)
    userStore.state.history = this.props.history;
    request.get();

  }

  render() {
    return (

      <div className="animated fadeIn">
        <AdminModal/>
        <h1>Liste des utilisateurs :</h1>
        <Row>
          {
            store.list.length > 0 ?
            store.list.map((user, i) => {
              return (
                <Col key={i.toString()} xs="12" sm="6" lg="3">
                  <Card style={{ cursor: 'pointer' }} xs="12" sm="6" lg="3"
                  onClick={() => {
                    store.current = user;
                    store.modal = true;
                  }}
                  >
                    <img className="imageUser" alt={"img "} src={user.url_verification} />
                    <CardBody className="cardAdmin">
                      <div><i className="fa fa-user-o"></i>{"   " + user.firstname + " " + user.lastname}</div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
            :
            <h3>Aucun utilisateurs à verifier</h3>
          }
        </Row>
      </div>
    );
  }
});

export default ParkyAdmin;

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