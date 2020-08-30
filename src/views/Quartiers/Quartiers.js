import React, { Component } from 'react';
import { Card, CardBody, CardFooter, Row, Button, CardHeader} from "reactstrap";
import { observer } from 'mobx-react'

import userStore from "../../stores/UserStore"
import { store, } from "../../stores/BollardStore"
import nRequest from "../../apiRequest/NeighborhoodRequest"

import RequestButton from "../../components/RequestButton"
import TopSelectionMode from "./TopSelectionMode"
import TopViewMode from "./TopViewMode"

import addIcon2 from '../../images/plus.png'

import './Quartiers.css'

const Quartiers = observer(class Quartiers extends Component {

  constructor(props) {
    super(props);
    userStore.state.history = this.props.history;

    //request.get();
    nRequest.get();
  }


  render() {

    return (
      <div className="animated fadeIn">
        {
          store.selectedN == null ?
            <div>
              <h1>Liste des quartiers :</h1>
              <Row>
                <RequestButton disabled={!userStore.state.permission.addBollard} errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={0} className="addButtonN" color="warning" action={() => nRequest.post()}>
                  <img className="addImageN" alt={"addicon2"} src={addIcon2} />
                </RequestButton>
                {
                  store.listNeighborhood.filter(e => e.id !== 0).map((elem) => {
                    return (
                        <Card key={elem.id.toString()} className="text-white bg-warning  mycard"
                          onClick={() => { store.selectedN = elem }}
                        >
                          <CardBody className="text-white text-center align-items-center">
                            <div className="text-value">{elem.name}</div>
                          </CardBody>
                          <CardFooter className="text-white bg-warning border-top-0">
                            {elem.bollards.length + " bornes associées"}
                          </CardFooter>
                        </Card>
                    )
                  })
                }
              </Row>
            </div>
            :
            <Card>
              <CardHeader className="text-white bg-warning"><Button className="text-white" size='lg' color="link" onClick={() => store.selectedN = null}><h2><i className="cui-arrow-left icons" /> Retour aux quartiers</h2></Button></CardHeader>
              <CardBody >
                {
                  store.selectionMode ?
                    <TopSelectionMode /> :
                    <TopViewMode />
                }
              </CardBody >
            </Card>
        }
      </div>
    );
  }
})

export default (Quartiers)
