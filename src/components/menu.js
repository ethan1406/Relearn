import { Nav, NavItem, Navbar} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Menu extends Component {
	render() {
		return (
	<Navbar fixedTop >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">ReFriend</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}> About </NavItem>
            <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
			
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
		);
	}
}
// <Link to="/about">About</Link> 

export default Menu;