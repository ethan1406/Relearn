import { Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Menu extends Component {
  render() {

    if(this.props._id === undefined || this.props._id === ''){
      return  <Navbar fixedTop >
        <Navbar.Header>
          <Navbar.Brand>
            <img src="/images/refriend.png"/>
          </Navbar.Brand>
          <Navbar.Brand>
            <a href="/friendList">ReFriend</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>;
    }
    return (
  <Navbar fixedTop >
        <Navbar.Header>
          <Navbar.Brand>
            <img src="/images/refriend.png"/>
          </Navbar.Brand>
          <Navbar.Brand>
            <a href="/friendList">ReFriend</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}> About </NavItem>
            <NavItem eventKey={2} href="/contacts">Settings</NavItem>
      
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href="/cart">Matches
                <Badge className="badge">
                {this.props.matchNotifications.length}</Badge>
            </NavItem>
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
  matchNotifications: PropTypes.array,
  _id: PropTypes.string 
 };


const mapStateToProps = (state) => {
  return {
    _id: state._id,
    matchNotifications: state.matchNotifications,
    pendingNotifications: state.pendingNotifications
  };
};

export default connect(mapStateToProps)(Menu);