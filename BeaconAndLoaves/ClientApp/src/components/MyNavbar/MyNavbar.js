import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
    currentUser: PropTypes.object,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent, currentUser } = this.props;
    const isUser = Object.keys(currentUser).length === 0 && currentUser.constructor === Object;

    const buildNavbar = () => {
      if (isAuthed && !isUser) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/properties">Properties</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/likedProperties">Liked Properties</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      if (isAuthed && isUser) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem className="nav-item">
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      if (!isAuthed) {
        return (
          <Nav className="ml-auto" navbar></Nav>
        );
      }
    };

    return (
      <div className="my-navbar mb-5">
       <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand href="/">Beacon & Loaves</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
           {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
