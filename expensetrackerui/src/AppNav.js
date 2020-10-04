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
                      <NavLink href="/category">Category</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/expense">Expense</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </div>
          );
    }
}
 
export default AppNav;