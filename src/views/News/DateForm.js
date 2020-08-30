import React, { Component } from 'react';
import {
  Button,
  Label,
  Col,
  Row
} from 'reactstrap';
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import fr from "date-fns/locale/fr";
//registerLocale("fr", fr);

import store from "../../stores/NewsStore"
import { toDateString, toHourString } from '../../ToolsJS'
import './News.css'

const DateForm = observer(class DateForm extends Component {

  render() {
    return (
      <div>
        <Label><strong>Dates et horaires </strong>(facultatif)</Label>

        <Row style={{ justifyContent: "space-around" }}>
          <Col style={{ marginBottom: 10 }}>
            <Label>Date de début</Label>
            <DatePicker className={store.state.emptyStartDate ? "bg-danger" : ""}
              dateFormat="dd/MM/yyyy" locale={fr}
              selected={store.state.currentNews.event.date_start == null ? null : new Date(store.state.currentNews.event.date_start)}
              onChange={date => store.state.currentNews.event.date_start = date == null ? null : toDateString(date, '-', true)} />
          </Col>


          <Col style={{ marginBottom: 10 }}>
            <Label>Date de fin</Label>
            <DatePicker className={store.state.emptyEndDate ? "bg-danger" : ""}
              minDate={store.state.currentNews.event.date_start == null ? null : new Date(store.state.currentNews.event.date_start)}
              disabled={store.state.currentNews.event.date_start == null}
              dateFormat="dd/MM/yyyy" locale={fr}
              selected={store.state.currentNews.event.date_end == null ? null : new Date(store.state.currentNews.event.date_end)}
              onChange={date => store.state.currentNews.event.date_end = date == null ? null : toDateString(date, '-', true)} />
          </Col>

          <Col style={{ marginBottom: 10 }}>
            <Label>Heure de début</Label>
            <DatePicker className={store.state.emptyStartHour ? "bg-danger" : ""}
              disabled={store.state.currentNews.event.date_start == null}
              dateFormat="HH:mm" locale={fr}
              selected={store.state.currentNews.event.hour_start == null ? null : new Date("01/01/1970 " + store.state.currentNews.event.hour_start)}
              onChange={date => store.state.currentNews.event.hour_start = date == null ? null : toHourString(date, ':', true)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Début"
            />
          </Col>
          <Col style={{ marginBottom: 10 }}>
            <Label>Heure de fin</Label>
            <DatePicker className={store.state.emptyEndHour ? "bg-danger" : ""}
              disabled={store.state.currentNews.event.date_start == null || store.state.currentNews.event.hour_start == null}
              dateFormat="HH:mm" locale={fr} 
              selected={store.state.currentNews.event.hour_end == null ? null : new Date("01/01/1970 " + store.state.currentNews.event.hour_end)}
              onChange={date => store.state.currentNews.event.hour_end = date == null ? null : toHourString(date, ':', true)}
              minTime={store.state.currentNews.event.hour_start == null ? null : new Date("01/01/1970 " + store.state.currentNews.event.hour_start)}
              maxTime={new Date().setHours(23)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Fin"
            />
          </Col>

        </Row>


        <Button disabled={(
          store.state.currentNews.event.date_start == null &&
          store.state.currentNews.event.date_end == null &&
          store.state.currentNews.event.hour_start == null &&
          store.state.currentNews.event.hour_end == null
        )}
          color="link" onClick={() => {
            store.state.currentNews.event.date_start = null;
            store.state.currentNews.event.date_end = null;
            store.state.currentNews.event.hour_start = null;
            store.state.currentNews.event.hour_end = null;
          }}
        >Supprimer les dates</Button>
      </div>
    );
  }
})

export default DateForm;