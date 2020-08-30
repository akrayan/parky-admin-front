import React, { Component } from 'react';
import { observer } from 'mobx-react'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "./Infractions.css"


import request from "../../apiRequest/OffencesRequest"
import { store } from "../../stores/OffencesStore"
import { toDateString, toHourString } from "../../ToolsJS"

const sortOffencesBy = ["du jour", "de la semaine", "du mois", "de l'année", "tous"];


const NumberList = observer(function NumberList() {
  let list;
  if (store.sortOffence === 0)
    list = store.dayList;
  else if (store.sortOffence === 1)
    list = store.weekList;
  else if (store.sortOffence === 2)
    list = store.monthList;
  else if (store.sortOffence === 3)
    list = store.yearList;
  else
    list = store.list;
  const listItems = list.map((n) => {
    if (n.infraction)
      return (
        <Card key={n.id.toString()} className="text-white bg-danger infCard">
          <CardHeader><div className="text-value">Infraction borne n°{n.bollard.id}</div></CardHeader>
          <CardBody >
            <div className="text-value">immatriculation : {n.license_plate != null ? n.license_plate.name : ""}</div>
            <div className="text-value">prix : {n.price}€</div>
          </CardBody>
          <CardFooter className="text-white bg-danger border-top-0"><div className="text-right">{"\nle " + toDateString(new Date(n.created_at)) + " à " + toHourString(new Date(n.created_at))}</div></CardFooter>
        </Card>);
    else
      return (

        <Card key={n.id.toString()} className="text-white bg-warning infCard">
          <CardHeader><div className="text-value">Problème borne n°{n.bollard.id}</div></CardHeader>
          <CardBody >
          </CardBody>
          <CardFooter className="text-white bg-warning border-top-0"><div className="text-right ">{"\nle " + toDateString(new Date(n.created_at)) + " à " + toHourString(new Date(n.created_at))}</div></CardFooter>

        </Card>
      );
  }
  );
  return (
    listItems
  );
})

const Infractions = observer(class Infractions extends Component {

  constructor(props) {
    super(props)

    console.log("first check");
    console.log(store.list);
    request.get();
    //console.log("second check");
    //console.log(store.list);
  }

  render() {
    return (
      <div className="animated fadeIn">

        <ButtonGroup className="float-right">
          <ButtonDropdown id='card1' isOpen={store.dropdown} toggle={() => store.dropdown = !store.dropdown}>
            <DropdownToggle caret className="p-0" >
              {sortOffencesBy[store.sortOffence]}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => store.sortOffence = 0}>du jour</DropdownItem>
              <DropdownItem onClick={() => store.sortOffence = 1}>de la semaine</DropdownItem>
              <DropdownItem onClick={() => store.sortOffence = 2}>du mois</DropdownItem>
              <DropdownItem onClick={() => store.sortOffence = 3}>de l'année</DropdownItem>
              <DropdownItem onClick={() => store.sortOffence = 4}>tous</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <h1>Liste des infractions :</h1>
        <Row>
          {
            store.list.length === 0 ?
              <h3>Il n'y pas d'infractions ou de problème</h3>
              : <NumberList />
          }

        </Row>

      </div>
    );
  }
})

export default Infractions;

/*
var list = [
  {
    id: 0,
    bId: 1309,
    date: "24/08/2018",
    hour: "12:05",
    infraction: true,
    plaque: "AZERTY",
    price: 3.15,

  },
  {
    id: 1,
    bId: 24,
    date: "24/08/2018",
    hour: "12:05",
    infraction: true,
    plaque: "AZ37TY",
    price: 3.15,

  },
  {
    id: 2,
    bId: 766,
    date: "24/08/2018",
    hour: "12:05",
    infraction: false,
  },
  {
    id: 3,
    bId: 42,
    date: "24/08/2018",
    hour: "12:05",
    infraction: false,

  },
  {
    id: 4,
    bId: 137,
    date: "24/08/2018",
    hour: "12:05",
    infraction: true,
    plaque: "AZE456",
    price: 3.15,

  },
]*/