import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css"

function NavBar({isLogged, logout}) {
  return (
<div>
      <Navbar expand="md" >
        <NavLink to="/" className="navbar-brand">
          Home
        </NavLink>

        <Nav className="ml-auto" navbar>
          {isLogged ? <><NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile" >Profile </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/" onClick={logout}>Log out</NavLink>
          </NavItem>
          </> :<>    <NavItem>
            <NavLink to="/signup">Sign up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem></> }
         
      
        </Nav>
      </Navbar>
      <hr></hr>
      </div>
  );
}

export default NavBar;
