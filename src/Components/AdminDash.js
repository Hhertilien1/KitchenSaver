import React, { useState } from "react";
import { Container, Table, Button, Form, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDash = () => {
  const [jobs, setJobs] = useState([
    {
      jobNumber: 101,
      jobName: "Kitchen Remodel A",
      numCabinets: 10,
      numUppers: 6,
      numLowers: 4,
      cabinetMaker: "John Doe",
      installer: "Mike Smith",
      dueDate: "2025-02-15",
      jobColor: "White",
      office: "400",
      status: "To-Do",
    },
    {
      jobNumber: 102,
      jobName: "Kitchen Remodel B",
      numCabinets: 15,
      numUppers: 8,
      numLowers: 7,
      cabinetMaker: "Jane Doe",
      installer: "Sarah Lee",
      dueDate: "2025-03-10",
      jobColor: "Blue",
      office: "402",
      status: "In Progress",
    },
  ]);

  const deleteJob = (index) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((_, i) => i !== index));
    }
  };

  return (
    <>
   <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Kitchen Saver</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/createjob">Create Job</Nav.Link>
            <Nav.Link as={Link} to="/createemployee">Create Employee</Nav.Link>
            <Nav.Link as={Link} to="/updateprofile">Update Profile</Nav.Link>
          </Nav>
          <Button variant="danger" as={Link} to="/logout">Logout</Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1>Admin Dashboard - Manage Jobs and Teams</h1>
        <p>Efficiently track, update, and manage job details.</p>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job #</th>
              <th>Job Name</th>
              <th># of Cabinets</th>
              <th># of Uppers</th>
              <th># of Lowers</th>
              <th>Cabinet Maker</th>
              <th>Installer</th>
              <th>Due Date</th>
              <th>Job Color</th>
              <th>Office</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.jobNumber}>
                <td>{job.jobNumber}</td>
                <td>{job.jobName}</td>
                <td>{job.numCabinets}</td>
                <td>{job.numUppers}</td>
                <td>{job.numLowers}</td>
                <td>{job.cabinetMaker}</td>
                <td>{job.installer}</td>
                <td>{job.dueDate}</td>
                <td>{job.jobColor}</td>
                <td>{job.office}</td>
                <td>
                  <Form.Select
                    value={job.status}
                    onChange={(e) => {
                      const updatedJobs = [...jobs];
                      updatedJobs[index].status = e.target.value;
                      setJobs(updatedJobs);
                    }}
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteJob(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AdminDash;