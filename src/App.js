import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>Kitchen Saver</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/AdminDash">Admin Dash</Nav.Link>
                <Nav.Link as={Link} to="/CreateJob">Create Job</Nav.Link>
                <Nav.Link as={Link} to="/CreateEmployee">Create Employee</Nav.Link>
                <Nav.Link as={Link} to="/UpdateProfile">Update Profile</Nav.Link>
              </Nav>
              <Button variant="danger" as={Link} to="/logout">Logout</Button>
            </Container>
          </Navbar>
        </header>
      </div>
    </Router>
  );
}

export default App;
