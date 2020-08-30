import React, { Component } from 'react';
import { Col, Row, Card, CardBody, DropdownMenu, DropdownItem, DropdownToggle, ButtonGroup, ButtonDropdown } from 'reactstrap';
import { observer } from 'mobx-react'
import userStore from '../../stores/UserStore'
import store from '../../stores/DashboardStore'
import request from '../../apiRequest/DashboardRequest'

import './Dashboard.css'



const Dashboard = observer(class Dashboard extends Component {
  constructor(props) {
    super(props);
    userStore.state.history = this.props.history;
    request.get();
    //store.state.tselect = store.state.list[0];
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          {
            userStore.state.permission.readBollard ?
              <Col xs="12" sm="6" lg="3">
                <Card className="text-white bg-warning backgroundCard neighborhood">
                  <CardBody >
                    <div style={{ cursor: 'pointer' }} onClick={() => userStore.state.history.push('/quartiers')}>
                      <div className="text-value">{store.state.nbNeighborhoods} Quartiers</div>
                      <div>Bornes installées : {store.state.nbBollards}</div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              : <div />
          }

          {
             userStore.state.permission.readOffence ?
              <Col xs="12" sm="6" lg="3">
                <Card className="text-white bg-danger backgroundCard offence">
                  <CardBody >
                    <ButtonGroup className="float-right">
                      <ButtonDropdown id='card1' isOpen={store.state.dropdownOffences} toggle={() => store.state.dropdownOffences = !store.state.dropdownOffences}>
                        <DropdownToggle caret className="p-0" color="transparent">
                          {store.getSortOffencesBy()}
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem onClick={() => store.state.sortOffence = 0}>du jour</DropdownItem>
                          <DropdownItem onClick={() => store.state.sortOffence = 1}>de la semaine</DropdownItem>
                          <DropdownItem onClick={() => store.state.sortOffence = 2}>du mois</DropdownItem>
                          <DropdownItem onClick={() => store.state.sortOffence = 3}>de l'année</DropdownItem>
                          <DropdownItem onClick={() => store.state.sortOffence = 4}>tous</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </ButtonGroup>
                    <div style={{ cursor: 'pointer' }} onClick={() => userStore.state.history.push('/infractions')}>

                      <div className="text-value">{store.state.offData[store.state.sortOffence].inf} Infractions </div>
                      <div>et {store.state.offData[store.state.sortOffence].prob} probléme technique</div>
                    </div>

                  </CardBody>
                </Card>
              </Col>
              : <div />
          }
          {
            userStore.state.permission.readNews ?
              <Col xs="12" sm="6" lg="3">
                <Card className="text-white bg-info backgroundCard inews">
                  <CardBody >
                    <div style={{ cursor: 'pointer' }} onClick={() => userStore.state.history.push('/news')}>
                      <div className="text-value">{store.state.nbEvents} Evenement</div>
                      <div>prévu dans votre ville</div>
                    </div>

                  </CardBody>
                </Card>
              </Col>
              : <div />
          }
          {
            userStore.state.permission.readTicket ?
              <Col xs="12" sm="6" lg="3">
                <Card className="text-white bg-primary backgroundCard ticket">
                  <CardBody >
                    <div style={{ cursor: 'pointer' }} onClick={() => userStore.state.history.push('/tickets')}>
                      <div className="text-value">{store.state.nbActifTickets} Ticket actif</div>
                      <div>sur {store.state.nbTickets} ticket au total</div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              : <div />
          }
          {/*
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary backgroundCard neighborhood">
              <CardBody >
                <div className="text-value">13 Quartiers</div>
                <div>Bornes installées : 125</div>
              </CardBody>
            </Card>
          </Col>


          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody >
                <div className="bigText">1053</div>
                <div className="text-value">Utilisateurs récents</div>
              </CardBody>
            </Card>
          </Col>




          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger" >
              <CardBody >
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={store.state.dropdownOffences} toggle={() => store.state.dropdownOffences = !store.state.dropdownOffences}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      {store.getSortOffencesBy()}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => store.state.sortOffence = 0}>du jour</DropdownItem>
                      <DropdownItem onClick={() => store.state.sortOffence = 1}>de la semaine</DropdownItem>
                      <DropdownItem onClick={() => store.state.sortOffence = 2}>du mois</DropdownItem>
                      <DropdownItem onClick={() => store.state.sortOffence = 3}>de l'année</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div style={{ cursor: 'pointer' }} onClick={() => userStore.state.history.push('/infractions')}>
                  <div className="bigText">{store.getNbOffences()}</div>
                  <div className="bigText">Infractions</div>
                </div>
              </CardBody>
            </Card>
          </Col>


          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody >
                <div className="bigText">23%</div>
                <div className="text-value">De places libres</div>
              </CardBody>
            </Card>
          </Col>
*/}
        </Row>
      </div>
    );
  }
})

export default Dashboard;
