import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, RotationControl } from "react-mapbox-gl";
//import ReactMapGL, {Marker} from 'react-map-gl';
import { Row, Col, Button, } from "reactstrap";
import { observer } from 'mobx-react'

import { store, notObserved, pushInFree, pushInSelected } from "../../stores/BollardStore"
import request from "../../apiRequest/NeighborhoodRequest"
import RequestButton from "../../components/RequestButton/RequestButton"

//import RequestButton from "../../components/RequestButton/RequestButton"

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2t5bnVyYWsiLCJhIjoiY2pqdTZydW1rOGtxdTNwczJmdm5henRndiJ9.VKA1MVztPqrirg-ZKBQGsw"
});

const TopSelectionMode = observer(class TopSelectionMode extends Component {
  map = null;

  render() {
    //notObserved.currentZoom =
    return (
      <div >

        <Row style={{ height: 500 }}>
          <Map style="mapbox://styles/mapbox/basic-v9"
            onStyleLoad={el => this.map = el}
            containerStyle={{ flex: 1, margin: 20 }}
            center={store.selectedN.bollards.length !== 0 ? [store.selectedN.bollards[0].longitude, store.selectedN.bollards[0].latitude]
              : store.selectedCopy.length !== 0 ? [store.selectedCopy[0].longitude, store.selectedCopy[0].latitude]
              : store.freeCopy.length !== 0 ? [store.freeCopy[0].longitude, store.freeCopy[0].latitude]
              : [2.06, 46.15]}
              
              
              //store.list.length === 0 ? [2.06, 46.15] : [store.list[0].longitude, store.list[0].latitude]}
            zoom={store.selectedN.bollards.length !== 0 || store.selectedCopy.length !== 0 || store.freeCopy.length !== 0 ? notObserved.currentZoom  : [4]}
              
            
              //store.list.length === 0 ? [4] : notObserved.currentZoom}
            onZoomEnd={(e) => notObserved.currentZoom = [this.map.getZoom()]}
          >
            <ScaleControl />
            <ZoomControl />
            <RotationControl style={{ top: 80 }} />

            <Layer
              type="circle"
              id="occuped"
              paint={{
                "circle-radius": 10,
                "circle-color": "#6f42c1",
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff",
                "circle-stroke-opacity": 1,
              }}>
              {
                store.selectedCopy.map((bollard, i) => <Feature key={i.toString()} style={{ cursor: 'pointer' }} onClick={
                  () => {
                    pushInFree(bollard, i);


                  }
                }
                  coordinates={[bollard.longitude, bollard.latitude]} />)
              }
            </Layer>
            <Layer
              type="circle"
              id="free"
              paint={{
                "circle-radius": 10,

                "circle-color": "#ffc107",
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff",
                "circle-stroke-opacity": 1
              }}>
              {
                store.freeCopy.map((bollard, i) => <Feature key={i.toString()} style={{ cursor: 'pointer' }} onClick={
                  () => {
                    pushInSelected(bollard, i);
/*
                    store.freeCopy.splice(i, 1);
                    store.selectedCopy.push(bollard);*/
                  }
                }
                  coordinates={[bollard.longitude, bollard.latitude]} />)
              }
            </Layer>
          </Map>
          <Col xs="4" >

            <Row style={{ justifyContent: "space-between" }} >
              <Col>
                <RequestButton errorMsg={store.errMsg} status={store.status} btnId={store.btnId} id={1}  color="primary" style={{ marginTop: 20 }} action={() => {
                  request.put(store.selectedCopy)
                  //store.selectionMode = false;
                }}
                >Valider</RequestButton>
              </Col>
              <Col>

                <Button block color="secondary" style={{ marginTop: 20 }} onClick={() => {
                  store.selectionMode = false;
                }}
                >Annuler</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {
          store.selectedN.bollards.length === 0 ?
            <h3>Aucunes bornes n'est associées à ce quartier</h3>
            : <div />
        }
        {
          store.listFree.length === 0 ?
            <h3>Aucunes bornes n'est disposnible</h3>
            : <div />
        }
      </div>
    );
  }
})

export default (TopSelectionMode)
