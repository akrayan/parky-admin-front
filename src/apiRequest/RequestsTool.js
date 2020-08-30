import cookie from 'react-cookies'
import userStore from "../stores/UserStore"
import { unloadStore } from '../stores/UnloadStore';

export var defaultHeader = {
  "Accept": "application/json",
  "Content-type": "application/json",
  'Authorization': 'Bearer '
}

export var postpicHeader = {
  "Content-type": "multipart/form-data",
  'Authorization': 'Bearer '
}

export function checkToken() {
  var userData = cookie.load('userData');
  if (userData === undefined) {
    error401()
    return false;
  }
  defaultHeader.Authorization = 'Bearer ' + userData;
  postpicHeader.Authorization = 'Bearer ' + userData;
  return true;
}

export var handleError = (error, errorMsg) => {
  if (error.response) {
    console.error(error.response.data)
    console.log(error.message)
    if (error.response.status === 401) error401();
    else if (error.response.status === 403) error403(errorMsg);
    else errorServer(errorMsg)
  }
  else
    console.error("request error");
}

function error401() {
  if (userStore.state.history) {
    userStore.state.history.push('/login')
    alert("Votre session a expiré")
    unloadStore()
  }
}

function error403(errorMsg) {
  if (errorMsg && errorMsg.lenght > 0)
    errorMsg[0] = "Vous n'avez pas les droits nécessaires"
}

function errorServer(errorMsg) {
  if (errorMsg && errorMsg.lenght > 0)
    errorMsg[0] = "Le serveur a rencontré un problème interne ou un problème de configuration et ne peut pas satisfaire votre requête."
}