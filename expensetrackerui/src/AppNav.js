import React, { Component } from 'react';   
import {Nav,NavItem,Navbar,NavLink, NavbarBrand } from 'reactstrap';

class AppNav extends Component {
    state = {  }
    render() { 
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Expense Tracker Application</NavbarBrand>              
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/categories">Category</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/expenses">Expense</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </div>
          );
    }
}
 
export default AppNav;