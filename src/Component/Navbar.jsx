import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button  } from 'react-bootstrap';
import { isAuthenticated } from '../Services/Athu';

const NavigationBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
    
        <div className="d-flex justify-content-between align-items-center w-100 ">
          {/* Brand on the left */}
          <Navbar.Brand as={Link} to="/" className="fw-bold ms-5">
            MyCompany
          </Navbar.Brand>

          {/* Toggle button for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav links on the right */}
          <Nav className="ms-auto d-flex align-items-center me-5">
            {!isAuthenticated()?(<Nav.Link as={Link} to="/register">Register</Nav.Link>):null}
            {!isAuthenticated()?(<Nav.Link as={Link} to="/login">Login</Nav.Link>):null}
            {isAuthenticated()?(<Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>):null}
            {isAuthenticated()?(<Nav.Link  className="bg-success text-white rounded-pill px-3 py-1 ms-2"
            style={{ textDecoration: 'none' }} onClick={props.LogoutUser}>
            Logout
            </Nav.Link>):null}
          </Nav>
        </Navbar.Collapse>
    
    </Navbar>
  );
};

export default NavigationBar;
