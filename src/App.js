import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import AdminDash from "./Components/AdminDash";
import AdminUpdateProfile from "./Components/AdminUpdateProfile";
import CreateEmployee from "./Components/CreateEmployee";
import CreateJob from "./Components/CreateJob";
import EmployeeDash from "./Components/EmployeeDash"; // Fix incorrect import
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import UpdateProfile from "./Components/UpdateProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Kitchen Saver</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admindash">Admin Dash</Nav.Link>
              <Nav.Link as={Link} to="/createjob">Create Job</Nav.Link>
              <Nav.Link as={Link} to="/createemployee">Create Employee</Nav.Link>
              <Nav.Link as={Link} to="/updateprofile">Update Profile</Nav.Link>
            </Nav>
            <Button variant="danger" as={Link} to="/logout">Logout</Button>
          </Container>
        </Navbar>

        {/* Define routes for pages */}
        <Routes>
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/createjob" element={<CreateJob />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/adminupdateprofile" element={<AdminUpdateProfile />} />
          <Route path="/employeedash" element={<EmployeeDash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Default Route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
