import React, { Component } from 'react';
//import ReactMapGL, {Marker} from 'react-map-gl';
import { Badge, Table } from "reactstrap";
import { observer } from 'mobx-react'

import {store,} from "../../stores/BollardStore"


const BollardTab = observer(class BollardTab extends Component {

  render() {

    return (
      <div>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Id de la borne</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Statut</th>
              <th>Immatriculation</th>
              {//<th>Arrivé à</th>
              }
              <th>Id de l'uttilisateur</th>
            </tr>
          </thead>
          <tbody>
            {store.selectedN.bollards.map((bollard) =>
              <tr key={bollard.id.toString()}>
                <td>{bollard.id}</td>
                <td>{bollard.latitude}</td>
                <td>{bollard.longitude}</td>
                <td>
                  {bollard.status === 0 ?
                    <Badge color="success">Libre</Badge>
                    :
                    <Badge color="danger">Occupé</Badge>
                  }
                </td>
                <td>{bollard.status !== 0 && bollard.license_plate !== null ? bollard.license_plate.name : "N/A"}</td>
                {//<td>{!bollard.status ? bollard.start_at : "N/A"}</td>
                }
                <td>{bollard.status !== 0 && bollard.license_plate != null ? bollard.license_plate.id : "N/A"}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }

})

export default (BollardTab)

/*{
              store.list.map((bollard) =>

                <tr key={bollard.id.toString()}>
                  <td>{bollard.id}</td>
                  <td>{bollard.latitude}</td>
                  <td>{bollard.longitude}</td>
                  <td>
                    {bollard.status == 0 ?
                      <Badge color="success">Libre</Badge>
                      :
                      <Badge color="danger">Occupé</Badge>
                    }
                  </td>
                  <td>
                    <input type={"numbers"} value={bollardState.tab[bollardState.tab.findIndex(elem => elem.id === bollard.id)].price} onChange={(e) => {
                      bollardState.tab[bollardState.tab.findIndex(elem => elem.id === bollard.id)].price = e.target.value;

                    }}></input>
                  </td>
                  <td>{!bollard.status && bollard.license_plate != null ? bollard.license_plate.name : "N/A"}</td>
                  {//<td>{!bollard.status ? bollard.start_at : "N/A"}</td>
                  }
                  <td>{!bollard.status && bollard.license_plate != null ? bollard.license_plate.id : "N/A"}</td>
                </tr>
            }
            */