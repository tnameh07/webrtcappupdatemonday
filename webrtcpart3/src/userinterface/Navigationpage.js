import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext.js';

const NavigationPage = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const location = useLocation(); // Get the current route location


    // Check if the current route is the room page
    if (location.pathname.startsWith('/room')) {
        return null; // Do not render the navigation bar on the room page
      }
    
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/api/placeholder/100/50"
              width="100"
              height="50"
              className="d-inline-block align-top"
              alt="Brand logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <>
                  <Navbar.Text className="me-3">
                    Welcome, {user.username}
                  </Navbar.Text>
                  <NavDropdown title="User Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/ragistration">Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationPage;
