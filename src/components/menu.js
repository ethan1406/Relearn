import { Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Menu extends Component {
  render() {
    return (
  <Navbar fixedTop >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/friendList">ReFriend</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}> About </NavItem>
            <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
      
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Settings</NavItem>
             <NavItem eventKey={2} href="/cart">Match Queue
                <Badge className="badge">
                {this.props.pendingNotifications.length}</Badge>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
// <Link to="/about">About</Link> 

Menu.propTypes = {
  pendingNotifications: PropTypes.array,
 };


const mapStateToProps = (state) => {
  return {
    pendingNotifications: state.pendingNotifications
  };
};

export default connect(mapStateToProps)(Menu);