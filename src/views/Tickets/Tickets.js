
import React, { Component } from 'react';
import { Container, Row, Col, Button,  } from 'reactstrap';
import { observer } from 'mobx-react'

import request from "../../apiRequest/TicketsRequest"
import { store } from "../../stores/TicketsStore"
import userStore from "../../stores/UserStore"

import AddTicket from './AddTicket'
import TicketsTab from './TicketsTab'
import MessageList from './MessageList'

import "./Tickets.css"

/*function NewMessage() {

}*/

/*
const MessageList = observer(function MessageList(props) {
  const listItems = store.tselect.messages.map((message, i) => {
    return (
      <div
        key={store.tselect.id.toString() + " " + i}
      >
        <Row
          style={{ borderWidth: 2, borderColor: "#555", padding: 10 }}>
          <Col xs={2}>
            {message.author}
            {"\nle " + message.date + " à " + message.hour}
          </Col>
          <Col>
            {message.text}
          </Col>
        </Row>
      </div>
    );
  })
  return (
    listItems
  );
});*/

function NewTicket() {
  return (
    <Button disabled={!userStore.state.permission.addTicket} size="lg" color="primary"
      onClick={() => store.modal = true}
      style={{ display:"block", marginLeft: "auto",marginRight: "auto", marginTop: 15, marginBottom: 10, textAlign: "center", pa: 10}}
      >
        <i className="fa fa-plus"></i>&nbsp;Créer un ticket
      
    </Button>
  );
}

const Tickets = observer(class Tickets extends Component {

  constructor(props) {
    super(props);
    request.get();
    //store.tselect = store.list[0];
  }

  render() {
    return (
      <div className="animated fadeIn">
        {!userStore.state.permission.parky ? <AddTicket /> : <div/>}
        <Container className={"TicketBox"} style={{ backgroundColor: "white", marginTop: 20, marginBottom: 20, marginLeft: 0, }}>
          <Row  className={"TitleRow"} >
          <Col style={{ borderColor: "#000" }} >
            {
              store.tselect === null ?
                "Tickets"
                :
                <Button className="text-white" size='lg' color="link" onClick={ () => store.tselect = null}><h2><i className="cui-arrow-left icons"/> Retour aux tickets</h2></Button>
                //<div onClick={() => store.tselect = null}><i className="cui-arrow-left icons" ></i>{" Retour"}</div>
            }
            </Col>
          </Row>
          <Row>
            {
              store.tselect === null ?
                <Col>
                  {!userStore.state.permission.parky ? <NewTicket /> : <div/>}
                  {
                    store.list.length === 0 ?
                    <h3>Vous n'avez pas de tickets</h3>
                  : <TicketsTab list={store.list} />
                  }
                </Col>
                :
                <Col>
                  <MessageList />
                </Col>

            }
          </Row>
        </Container>
      </div>
    );
  }
});

export default Tickets;

