
import React, { Component } from 'react';
import { Table, Badge } from 'reactstrap';
import { observer } from 'mobx-react'

import { store } from "../../stores/TicketsStore"
import { toDateString, toHourString } from "../../ToolsJS"

import "./Tickets.css"


const TicketsTab = observer(class TicketsTab extends Component {

  render() {
    return (
      <div>
        <Table >
          <thead>
            <tr>
              <th>Auteur</th>
              <th>Date</th>
              <th>Objet</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.list.map((ticket, i) => {
                let d = new Date(ticket.created_at);
                return (
                  <tr
                    style={{ cursor: 'pointer' }}
                    key={ticket.id.toString()}
                    onClick={() => {
                      store.selected = i
                      store.tselect = ticket;
                    }}
                  >

                    <td>{ticket.messages[0].author}</td>
                    <td>{"le " + toDateString(d) + " à " + toHourString(d)}</td>
                    <td>{ticket.object}</td>
                    <td>
                      {ticket.status === 0 ?
                        <Badge color="danger">Fermé</Badge>
                        : <Badge color="success">Actif</Badge>
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div >
      // listItems
    );
  }
})


export default TicketsTab;
