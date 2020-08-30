
import React, { Component } from 'react';
import { Row, Col,  Input, Badge } from 'reactstrap';
import { observer } from 'mobx-react'
import userStore from '../../stores/UserStore'

import { store } from "../../stores/TicketsStore"
import {toDateString, toHourString} from "../../ToolsJS"
import request from "../../apiRequest/TicketsRequest"
import RequestButton from "../../components/RequestButton"


import "./Tickets.css"

let addMessage = () => {

  if (store.message !== "") {
    request.postMessage()
    /*
    let date = new Date(Date.now());
    let tmp = {
      author: userStore.state.user.username,
      text: store.message,
      date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
      hour: date.getHours() + "h" + date.getMinutes(),
    }
    store.tselect.messages.push(tmp);
************************/
    store.message = "";
    store.emptyText = false;

  }
  else
    store.emptyText = true;
}

const MessageList = observer(class MessageList extends Component {

  render() {
    return (
      <Col>
        <Row className={"Ticket"} style={{ padding: 10 }}>
          <Col>{"Sujet : " + store.tselect.object}</Col>
          <Col className={"text-right"}>
            {store.tselect.status === 0 ?
              <Badge color="danger">Fermé</Badge>
              : <Badge color="success">Actif</Badge>}
          </Col>
        </Row>
        {
          store.tselect.messages.map((message, i) => {
            return (
              <div
                key={store.tselect.id.toString() + " " + i}
              >
                <Row
                  style={{ borderBottomStyle: "solid", borderWidth: 1, borderColor: "#AAA8", borderTopStyle: i === 0 ? "solid" : "none", padding: 10 }}>
                  <Col xs={2}>
                    {message.author}
                    {"\nle " + toDateString(new Date(message.created_at)) + " à " + toHourString(new Date(message.created_at))}
                  </Col>
                  <Col>
                    {message.text}
                  </Col>
                </Row>
              </div>
            );
          })
        }
        <Row style={{ padding: 10, fontSize: 20 }}>

          {store.tselect.status === 0 ? "Ce ticket est fermé" : "Répondre au ticket"}
          <Input disabled={store.tselect.status === 0 || !userStore.state.permission.editTicket} type="textarea" invalid={store.emptyText} placeholder="Ecrivez votre message" value={store.message} onChange={(e) => store.message = e.target.value} rows={5} />
        </Row>
        <Row style={{ padding: 10 }}>
          <RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={3} disabled={store.tselect.status === 0 || !userStore.state.permission.editTicket} color="primary" action={addMessage}>Envoyer</RequestButton>
          <RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={1} className="ml-3" disabled={store.tselect.status === 0 || !userStore.state.permission.editTicket} color="danger" action={() => { if (window.confirm("Etes-vous sûr de vouloir clore ce ticket ?"))request.put()}}>Clore ce ticket</RequestButton>
        </Row>
      </Col>
    );
  }
});

export default MessageList;

