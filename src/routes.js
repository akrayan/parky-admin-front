import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
//import Tickets from './views/Tickets/Tickets';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Quartiers = React.lazy(() => import('./views/Quartiers'));
const Infractions = React.lazy(() => import('./views/Infractions'));
const News = React.lazy(() => import('./views/News'));
const Comptes = React.lazy(() => import('./views/Comptes'));
const Tickets = React.lazy(() => import('./views/Tickets'));
const ParkyAdmin = React.lazy(() => import('./views/ParkyAdmin'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  //{ path: '/theme', exact: true, name: 'Themec', component: Quartiers },  
  { path: '/quartiers', name: 'Quartiers', component: Quartiers },
  { path: '/infractions', name: 'Infractions', component: Infractions },
  { path: '/news', name: 'Actualités', component: News },
  { path: '/comptes', name: 'Comptes', component: Comptes },
  { path: '/tickets', name: 'Tickets', component: Tickets },
  { path: '/users', name: 'Utilisateur', component: ParkyAdmin },

];

export default routes;
