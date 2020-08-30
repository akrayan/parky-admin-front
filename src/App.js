import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
//import Login from './views/Login'
//import DefaultLayout from './containers/DefaultLayout'
//import cookie from 'react-cookies'
//import store from './store'


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading
});


class App extends Component {
  /*constructor(props) {
    super(props);

  }*/

  render() {
    return (
      <HashRouter>
          <Switch>
            <Route path="/login" name="Login Page" component={Login} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
/*

class App extends Component {

  render() {
    return (
      <HashRouter>
          <Switch>
            <Route path="/login" name="Login Page" render={() => (<Login cookies={this.props.cookies}/>)} />
            <Route path="/" name="Home" render={() => (<DefaultLayout cookies={this.props.cookies}/>)} />
          </Switch>
      </HashRouter>
    );
  }
}

export default withCookies(App);*/