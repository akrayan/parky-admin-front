import React, { Component } from 'react';
import {
  Col,
  Row,
  Badge,
  CardFooter,
  // ListGroupItem,
  // ListGroupItemHeading,
  //  ListGroupItemText,
  Button,

  Card,
  CardBody,
  CardHeader,

  //CardImg,
  //FormFeedback
  //Toast,
  //ToastBody,
  //ToastHeader
} from 'reactstrap';

import { observer } from 'mobx-react'
import addIcon from '../../images/add-image.png'
import addIcon2 from '../../images/plus.png'
import './News.css'



import "react-datepicker/dist/react-datepicker.css";

import AddModal from './AddModal'
import EditModal from './EditModal'
/*
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});*/

import store from "../../stores/NewsStore"
import userStore from "../../stores/UserStore"
import request from "../../apiRequest/NewsRequest"



function refreshList() {
  request.get();
}


function editNews(news) {
  console.log(news);
  console.log(store.state.currentNews);
  store.state.emptyText = false;
  store.state.emptyTitle = false;
  //store.state.emptyCity = false;
  store.state.currentNews = {
    id: news.id,
    url: news.url,
    title: news.title,
    description: news.description,

    event: {
      date_start: news.event.date_start,
      date_end: news.event.date_end,
      hour_start: news.event.hour_start,
      hour_end: news.event.hour_end,
    }
  };

  console.log(store.state.currentNews)
  /* if (news.event.length > 0) {
     console.log(news.event[0].event_start)
 
     store.state.currentNews.dateStart = new Date(news.event[0].event_start);
     console.log(store.state.currentNews.dateStart)
     store.state.currentNews.hourStart = new Date(news.event[0].event_start);
     store.state.currentNews.dateEnd = new Date(news.event[0].event_end);
     store.state.currentNews.hourEnd = new Date(news.event[0].event_end);
   }
   else {
     store.state.currentNews.dateStart = null
     store.state.currentNews.dateEnd = null
     store.state.currentNews.hourStart = null
     store.state.currentNews.hourEnd = null
   }*/
  store.state.oldurl = news.url;
  //store.state.currentNews.date = Date.now();
  store.state.editModal = true;
}

const CardBadge = observer(function CardBadge(props) {
  if (props.news.event.date_start == null && props.news.event.date_end == null)
    return (<Badge color="secondary" >Non programmé</Badge>);
  else if ((new Date(props.news.event.date_end)).getTime() - Date.now() < 0)
    return (<Badge color="danger" >Terminé</Badge>);
  else if ((new Date(props.news.event.date_start)).getTime() - Date.now() > 0)
    return (<Badge color="success" >A venir</Badge>);
  return (<Badge color="warning" >En Cours</Badge>);
})

const CardList = observer(function CardList(props) {
  const numbers = props.list;
  const listItems = numbers.map((news) =>

    <Col xs="12" sm="6" md="4" key={news.id.toString()}>
      <Card  >
        <CardHeader>
          <h5> {news.title} </h5>
          <h6>Ville de {news.user.firstname}</h6>
        </CardHeader>
        <Button className="cardBody" color="ghost-secondary" size="lg" block onClick={() => editNews(news)}>

          {
            news.url !== "" && news.url != null ?
              <img className="imageBig" alt={"img " + news.id} src={news.url} />
              :
              <img className="imageIcon" alt={"img " + news.id} src={addIcon} />
          }
          <CardBody>
            <div className="cardBodyText">{news.description}</div>
          </CardBody>


        </Button>
        {/* <CardFooter>
          Du {news.event[0].start_event}
          
       </CardFooter>*/}
        <CardFooter>
          <CardBadge news={news} />
        </CardFooter>
      </Card>
    </Col>
  );
  return (
    listItems
  );
})


const toggleEdit = () => {
  //store.state.currentNews = store.state.memNews
  store.state.editModal = false
}

const News = observer(class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    userStore.state.history = this.props.history;
    refreshList();

  }

  toggle() {
    if (!store.state.modal) {
      store.state.currentNews = {
        //id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
        title: "",
        //city_name: "",
        date: Date.now(),
        //hour: "",
        image: null,

        url: "",
        description: "",

        event: {
          date_start: null,
          date_end: null,
          hour_start: null,
          hour_end: null,
        }
      }
      store.state.emptyText = false;
      store.state.emptyTitle = false;
      store.state.emptyEndDate = false
      store.state.emptyEndHour = false
    }
    store.state.modal = !store.state.modal;
  }

  render() {

    return (
      <div className="animated fadeIn">
        <AddModal modal={store.state.modal} addNews={this.addNews} toggle={this.toggle} />
        <EditModal modal={store.state.editModal} toggle={toggleEdit} />
        <h1>Liste des actualités :</h1>
        <Row>
            <Button disabled={!userStore.state.permission.addNews} className="addButton" color="primary" size="lg" block onClick={this.toggle}>
              <img className="addImage" alt={"addicon2"} src={addIcon2} />
            </Button>
          <CardList list={store.state.list} />
        </Row>
      </div>
    );
  }
})

export default News;
