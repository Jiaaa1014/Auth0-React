import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
export default class Header extends Component {

  onLoginClick = () => this.props.onLoginClick()
  onLogoutClick = () => this.props.onLogoutClick()

  render() {
    let navItem
    if (this.props.idToken) navItem = <NavItem onClick={this.onLogoutClick} href="#">Logout</NavItem>
    else navItem = <NavItem onClick={this.onLoginClick} href="#">Login</NavItem>

    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              ReactAuth App
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {navItem}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
