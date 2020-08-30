import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, RotationControl } from "react-mapbox-gl";
//import ReactMapGL, {Marker} from 'react-map-gl';
import { Row, Col, InputGroup, Input, Button, ModalBody, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { observer } from 'mobx-react'

//import userStore from "../../stores/UserStore"
import { store, copyList } from "../../stores/BollardStore"
//import request from "../../apiRequest/BollardsRequest"

import BollardTab from "./BollardTab"
import RequestButton from "../../components/RequestButton/RequestButton"
import nRequest from "../../apiRequest/NeighborhoodRequest"


const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2t5bnVyYWsiLCJhIjoiY2pqdTZydW1rOGtxdTNwczJmdm5henRndiJ9.VKA1MVztPqrirg-ZKBQGsw"
});



const TopViewMode = observer(class TopViewMode extends Component {

  render() {
    return (
      <div >
        <Modal isOpen={store.bobool} toggle={() => store.bobool = false} >
          <ModalHeader className="bg-danger" toggle={() => store.bobool = false}>Suprimer ce quatier</ModalHeader>
          <ModalBody>
            {"Etes vous sur de vouloir suprimer ce quartier ?\nToutes les bornes appartenant à ce quartier seront libres."}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { store.selectedN = null; store.bobool = false }}>Oui</Button>{' '}
            <Button color="secondary" onClick={() => store.bobool = false}>Non</Button>
          </ModalFooter>
        </Modal>
        <Row style={{ height: 500 }}>
          <Map style="mapbox://styles/mapbox/basic-v9"
            containerStyle={{ flex: 1, margin: 20 }}
            center={store.selectedN.bollards.length === 0 ? [2.06, 46.15] : [store.selectedN.bollards[0].longitude, store.selectedN.bollards[0].latitude]}
            zoom={store.selectedN.bollards.length === 0 ? [4] : [15]}
          >
            <ScaleControl />
            <ZoomControl />
            <RotationControl style={{ top: 80 }} />

            <Layer
              type="circle"
              id="occuped"
              paint={{
                "circle-radius": 7,
                "circle-color": "#ff5200",
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff",
                "circle-stroke-opacity": 1
              }}
            >
              {
                store.selectedN.bollards.filter((bollard) => bollard.status === 1).map((bollard, i) => <Feature key={i.toString()} style={{ cursor: 'pointer' }} coordinates={[bollard.longitude, bollard.latitude]} />)
              }
            </Layer>
            <Layer
              type="circle"
              id="free"
              paint={{
                "circle-radius": 7,
                "circle-color": "#52ff00",
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff",
                "circle-stroke-opacity": 1
              }}
            >
              {
                store.selectedN.bollards.filter((bollard) => bollard.status === 0).map((bollard, i) => <Feature key={i.toString()} style={{ cursor: 'pointer' }} coordinates={[bollard.longitude, bollard.latitude]} />)
              }
            </Layer>
          </Map>
          <Col xs="4">
            <div style={{ justifyContent: "space-between" }} >

              <strong style={{ marginTop: 25 }}>Nom du quartier :</strong>
              <InputGroup style={{ marginTop: 5 }}>
                <Input placeholder="Nom du quartier" value={store.selectedN.name} onChange={(e) => store.selectedN.name = e.target.value} />

              </InputGroup>

              <strong style={{ marginTop: 25 }}>Prix de la place :</strong>
              <InputGroup style={{ marginTop: 5 }}>
                <Input placeholder="Prix des bornes" value={store.selectedN.price != null ? store.selectedN.price : ""} onChange={(e) => store.selectedN.price = e.target.value} />

              </InputGroup>

              <Row style={{ justifyContent: "space-between" }} >
                <Col>
                  <RequestButton color="success" errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={1}  text={"Enregistrer"} style={{ marginTop: 20 }} action={() => { nRequest.put() }} />
                </Col>
                <Col>
                  <Button color="primary" style={{ marginTop: 20 }} onClick={() => {
                    copyList();
                    store.selectionMode = true;
                  }}
                  >Edition</Button>
                </Col>
                <Col>
                  <RequestButton color="danger" errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={2}  text={"Suprimer"} style={{ marginTop: 20 }} action={() => { if (window.confirm("Etes-vous sûr de vouloir supprimer ce quartier ?"))nRequest.delet() }} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        {
          store.selectedN.bollards.length === 0 ?
            <h3>Aucunes bornes n'est associée à ce quartier</h3>
            : <BollardTab />
        }
      </div>
    );
  }
})



export default (TopViewMode)
