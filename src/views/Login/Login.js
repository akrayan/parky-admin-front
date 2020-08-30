

import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import './Login.css'

import RequestButton from '../../components/RequestButton'
//import axios from 'axios'
//import store from '../../store';
//import cookie from 'react-cookies'
import userStore from '../../stores/UserStore'
import {store, updateMail, updatePassword, updateStatus} from '../../stores/LoginStore'
import request from "../../apiRequest/AuthRequest"
import { observer } from 'mobx-react'

import logo from '../../images/logo2.png'




const Login = observer(class Login extends Component {

  constructor(props) {
    super(props)
    userStore.state.history = this.props.history;

  
  }

  state = {
    loading: false,
    loaded: false,
    mail: '',
    password: '',
  }

  handleMail = (e) => {
    updateMail(e.target.value) ;
  }

  handlePassword = (e) => {
   updatePassword(e.target.value) ;
  }

  handleSubmit = (e) => {
    //e.preventDefault()
    updateStatus("Loading", null);
    request.post()
  }

  

  render() {
    return (
      <div className="app flex-row align-items-center Login-background">
        <Container >
          <Row className="justify-content-center">
            <Col md="8" >
            <img src={logo} alt="Logo" className="Logo" />
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Connexion</h1>
                      <p className="text-muted">connectez-vous à votre compte</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="E-Mail" autoComplete="username" value={store.mail} onChange={this.handleMail} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Mot de passe" autoComplete="current-password" value={store.password} onChange={this.handlePassword} />
                      </InputGroup>
                  
                      <RequestButton color={"primary"} errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={0} text={"Connexion"} action={this.handleSubmit}/>

                       
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
})

export default Login;