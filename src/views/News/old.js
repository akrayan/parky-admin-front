return (
    <Modal isOpen={props.modal}>
      <ModalHeader >Ajouter une News</ModalHeader>
      <ModalBody>
        {/*<FormGroup>
          <Label><strong>Nom de la ville</strong></Label>
          <Input type="text" invalid={appState.emptyCity} value={appState.currentNews.city_name} onChange={(e) => appState.currentNews.city_name = e.target.value} />
        </FormGroup>
        */}
        <FormGroup>
          <Label><strong>Titre</strong></Label>
          <Input type="text" invalid={appState.emptyTitle} value={appState.currentNews.title} onChange={(e) => appState.currentNews.title = e.target.value} />
        </FormGroup>
        <FormGroup>
          <Label><strong>Description </strong></Label>
          <Input type="textarea" invalid={appState.emptyText} value={appState.currentNews.description} onChange={(e) => appState.currentNews.description = e.target.value} rows={5} />
        </FormGroup>
        <FormGroup>

          <Label><strong>Ajouter un lien vers une image </strong>(facultatif)</Label>
          {/*<Input type="text" value={appState.currentNews.image} onChange={(e) => appState.currentNews.image = e.target.value} />*/}

          <Input type="file" accept="image/png, image/jpeg" onChange={(e) => {
            appState.currentNews.image = e.target.files[0]
            appState.currentNews.url = URL.createObjectURL(e.target.files[0])
          }} />
          {appState.currentNews.url != "" && appState.currentNews.url != null && <img className="imageBig" alt={"uploaded"} src={appState.currentNews.url} />}
        </FormGroup>
        {/*<DatePicker
          dateFormat="dd/MM/YYYY"
          selected={appState.currentNews.date}
          onChange={(date => appState.currentNews.date = date)}
        >*/}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.addNews}>Ajouter</Button>{' '}
        <Button color="secondary" onClick={props.toggle}>Annuler</Button>
      </ModalFooter>
    </Modal>
  )
}










//
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
//

import React, { Component } from 'react';
import {
  Col,
  Row,
  // ListGroupItem,
  // ListGroupItemHeading,
  //  ListGroupItemText,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  //CardImg,
  //FormFeedback
  //Toast,
  //ToastBody,
  //ToastHeader
} from 'reactstrap';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import addIcon from '../../images/add-image.png'
import addIcon2 from '../../images/plus.png'
import './News.css'
import axios from 'axios';
import cookie from 'react-cookies'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import AddModal from './AddModal'
/*
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});*/

var appState = observable({
  image: null,
  modal: false,
  editModal: false,
  emptyText: false,
  emptyCity: false,
  emptyTitle: false,
  oldurl: "",
  list: [],
  currentNews: {
    title: "string",
    description: "string",
    url: "string",
    events: [
      {
        "event_start": "string",
        "event_end": "string",
        "event_date": "string"
      }
    ]
  }
});

var history = null;


function refreshList() {
  var userData = cookie.load('userData');

  if (userData === undefined) {
    history.push('/login')
    //alert("votre session a expire")

  }
  else {
    axios.get("http://dev.api.parkyeip.com/admin/news", {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + userData
      }
    })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data[0]);

        appState.list = response.data.data;
      })
      .catch((e) => {
        console.log(e.response);
        history.push('/login')
        alert("votre session a expire")
      })
  }
}

function onClickAddImage(news) {
  appState.currentNews = news;
  console.log("zooooooob      " + news.id)
  appState.modal = true;
}

function editNews(news) {
  appState.emptyText = false;
  appState.emptyTitle = false;
  //appState.emptyCity = false;
  appState.currentNews = {
    id: news.id,
    url: news.url,
    title: news.title,
    description: news.description,
  };
  appState.oldurl = news.url;
  //appState.currentNews.date = Date.now();
  appState.editModal = true;
}

function CardList(props) {
  const numbers = props.list;
  console.log("numbers equal");
  console.log(numbers);
  const listItems = numbers.map((news) =>

    <Col xs="12" sm="6" md="4" key={news.id.toString()}>
      <Card  >
        <CardHeader>
          <h5> {news.title} </h5>
          <h6>Ville de {news.user.firstname}</h6>
        </CardHeader>
        <Button className="cardBody" color="ghost-secondary" size="lg" block onClick={() => editNews(news)}>

          {
            news.url != "" && news.url != null ?
              <img className="imageBig" alt={"img " + news.id} src={news.url} />
              :
              <img className="imageBig" alt={"img " + news.id} src={addIcon} />
          }
          <CardBody>
            {news.description}
          </CardBody>

        </Button>
        {/* <CardFooter>
          Du {news.event[0].start_event}
          
       </CardFooter>*/}
      </Card>
    </Col>
  );
  return (
    listItems
  );
}


function putNews(userData) {
  axios.put("http://dev.api.parkyeip.com/admin/news/" + appState.currentNews.id, {
    title: appState.currentNews.title,
    description: appState.currentNews.description,
    url: appState.currentNews.url,
  },
    {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + userData
      }
    })
    .then((response) => {
      console.log(response.data)
      refreshList();
    })
    .catch((e) => {
      console.log(e.response)
      history.push('/login')
      alert("votre session a expire")
    });
}

const confirmEdit = () => {
  var i = 0;
  var userData = cookie.load('userData');
  if (userData === undefined) {
    history.push('/login')
    //alert("votre session a expire")

  }
  appState.emptyText = appState.currentNews.description === "";
  appState.emptyTitle = appState.currentNews.title === "";
  //appState.emptyCity = appState.currentNews.city_name === "";
  if (!appState.emptyText && !appState.emptyTitle)//&& !appState.emptyCity)
  {
    while (i < appState.list.length && appState.list[i].id !== appState.currentNews.id)
      i++;
    if (i < appState.list.length) {
      appState.list[i].url = appState.currentNews.url;
      appState.list[i].title = appState.currentNews.title;
      appState.list[i].description = appState.currentNews.description;
      appState.editModal = false;

      if (appState.oldurl != appState.currentNews.url) {
        var form = new FormData();
        form.append("file", appState.currentNews.image, appState.currentNews.image.name)
        axios.post("http://dev.api.parkyeip.com/admin/pictures", form,
          {
            headers: {
              "Content-type": "multipart/form-data",
              'Authorization': 'Bearer ' + userData
            }
          })
          .then((response) => {
            console.log(response.data)
            appState.currentNews.url = response.data.url
            //refreshList();
            putNews(userData);
          })
          .catch((e) => {
            console.log(e.response)
            history.push('/login')
            alert("votre session a expire")
          });
      }
      else
        putNews(userData);
    }
  }
}

const deleteNews = () => {
  var i = 0;
  var userData = cookie.load('userData');
  if (userData === undefined) {
    history.push('/login')
    //alert("votre session a expire")

  }
  while (i < appState.list.length && appState.list[i].id !== appState.currentNews.id)
    i++;
  if (i < appState.list.length) {
    console.log(i)
    console.log(appState.list[i])
    appState.list.splice(i, 1)
    //console.log(list[i])
    appState.editModal = false;

    axios.delete("http://dev.api.parkyeip.com/admin/news/" + appState.currentNews.id, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + userData
      }
    })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data[0]);

        //appState.list = response.data;
      })
      .catch((e) => {
        console.log(e.response);
        history.push('/login')
        alert("votre session a expire")
      })
  }

}

const EditModal = observer(function EditModal(props) {
  return (
    <Modal isOpen={props.modal}>
      <ModalHeader >Editer une News</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label><strong>Titre</strong></Label>
          <Input type="text" invalid={appState.emptyTitle} value={appState.currentNews.title} onChange={(e) => appState.currentNews.title = e.target.value} />
        </FormGroup>
        <FormGroup>
          <Label><strong>Description </strong></Label>
          <Input type="textarea" invalid={appState.emptyText} value={appState.currentNews.description} onChange={(e) => appState.currentNews.description = e.target.value} rows={5} />
        </FormGroup>
        <FormGroup>

          <Label><strong>Ajouter une image </strong>(facultatif)</Label>
          <Input type="file" accept="image/png, image/jpeg" onChange={(e) => {
            appState.currentNews.image = e.target.files[0]
            appState.currentNews.url = URL.createObjectURL(e.target.files[0])
          }} />
          {appState.currentNews.url != "" && appState.currentNews.url != null && <img className="imageBig" alt={"uploaded"} src={appState.currentNews.url} />}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deleteNews}>Supprimer</Button>{' '}
        <Button color="primary" onClick={confirmEdit}>Modifier</Button>{' '}
        <Button color="secondary" onClick={toggleEdit}>Annuler</Button>
      </ModalFooter>
    </Modal>
  )
})

const toggleEdit = () => {
  //appState.currentNews = appState.memNews
  appState.editModal = false
}

const News = observer(class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.addNews = this.addNews.bind(this);
    history = this.props.history;
    refreshList();

  }

  postNews(userData) {
    axios.post("http://dev.api.parkyeip.com/admin/news", {
      title: appState.currentNews.title,
      description: appState.currentNews.description,
      url: appState.currentNews.url,
      events: [],
    },
      {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + userData
        }
      })
      .then((response) => {
        console.log(response.data)
        refreshList();
      })
      .catch((e) => {
        console.log(e.response)
        history.push('/login')
        alert("votre session a expire")
      });
  }

  addNews() {
    var userData = cookie.load('userData');
    if (userData === undefined) {
      history.push('/login')
      //alert("votre session a expire")
  
    }
    appState.emptyText = appState.currentNews.description === "";
    appState.emptyTitle = appState.currentNews.title === "";
    //appState.emptyCity = appState.currentNews.city_name === "";
    if (!appState.emptyText && !appState.emptyTitle)//&& !appState.emptyCity)
    {
      list.push(appState.currentNews);
      appState.modal = !appState.modal;
      if (appState.currentNews.url != "") {
        var form = new FormData();
        form.append("file", appState.currentNews.image, appState.currentNews.image.name)
        axios.post("http://dev.api.parkyeip.com/admin/pictures", form,
          {
            headers: {
              "Content-type": "multipart/form-data",
              'Authorization': 'Bearer ' + userData
            }
          })
          .then((response) => {
            console.log(response.data)
            appState.currentNews.url = response.data.url
            //refreshList();
            this.postNews(userData);
          })
          .catch((e) => {
            console.log(e.response)
            history.push('/login')
            alert("votre session a expire")
          });
      }
      else
        this.postNews(userData);
    }
  }

  toggle() {
    if (!appState.modal) {
      appState.currentNews = {
        //id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
        title: "",
        //city_name: "",
        date: Date.now(),
        //hour: "",
        image: null,
        url: "",
        description: ""
      }
      appState.emptyText = false;
      appState.emptyTitle = false;
    }
    appState.modal = !appState.modal;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <AddModal modal={appState.modal} addNews={this.addNews} toggle={this.toggle} className={this.props.className} />
        <EditModal modal={appState.editModal} toggle={toggleEdit} className={this.props.className} />


        <Row>
          <Col className="addButton" xs="12" sm="6" md="4">
            <Card className="addButton">
              <Button className="addButton" color="primary" size="lg" block onClick={this.toggle}>
                <CardBody className="addButton">
                  <img alt={"addicon2"} src={addIcon2} />
                </CardBody>
              </Button>
            </Card>
          </Col>
          <CardList list={appState.list} />
        </Row>
      </div>
    );
  }
})

export default News;
