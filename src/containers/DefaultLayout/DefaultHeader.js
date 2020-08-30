import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../images/logo.png'
import sygnet from '../../images/icon.jpg'
import { unloadStore } from '../../stores/UnloadStore';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 75, height: 42, alt: 'Parky Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Parky Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto" navbar>
          <NavItem className="px-3">
            <Link to="/login" onClick={() => unloadStore()}>Déconnexion</Link>
          </NavItem>
        </Nav>
      </React.Fragment >
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
