import React, { useState } from "react";
import { Container, Table, Button, Form, Navbar, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
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
      materialsOrdered: "No",
      comments: ""
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
      materialsOrdered: "Yes",
      comments: "Waiting for shipment."
    },
  ]);

  const [filters, setFilters] = useState({
    office: "",
    status: "",
    materialsOrdered: "",
    installer: ""
  });

  const [showModal, setShowModal] = useState(false); 


  const deleteJob = (index) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((_, i) => i !== index));
    }
  };
  
  

  const getStatusColor = (status) => {
    switch (status) {
      case "To-Do":
        return "red";
      case "In Progress":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "black";
    }
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.office === "" || job.office === filters.office) &&
      (filters.status === "" || job.status === filters.status) &&
      (filters.materialsOrdered === "" || job.materialsOrdered === filters.materialsOrdered) &&
      (filters.installer === "" || job.installer.toLowerCase().includes(filters.installer.toLowerCase()))
    );
  });

  const handleClearFilters = () => {
    setFilters({
      office: "",
      status: "",
      materialsOrdered: "",
      installer: ""
    });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
       <Navbar expand="lg" style={{ backgroundColor: '#641e1e' }}>
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

        {/* Filter Section */}
        <Row className="mb-3">
        <Col>
            <Form.Select
              value={filters.office}
              onChange={(e) => setFilters({ ...filters, office: e.target.value })}
            >
              <option value="">Filter by Office</option>
              <option value="400">400</option>
              <option value="402">402</option>
              <option value="403">403</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Filter by Status</option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              value={filters.materialsOrdered}
              onChange={(e) => setFilters({ ...filters, materialsOrdered: e.target.value })}
            >
              <option value="">Filter by Materials Ordered</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Filter by Installer"
              value={filters.installer}
              onChange={(e) => setFilters({ ...filters, installer: e.target.value })}
            />
          </Col>
          <Col className="d-flex align-items-center justify-content-start">
            <Button variant="secondary" onClick={handleClearFilters} className="me-2">
              Clear Filters
            </Button>
            <Button variant="info" onClick={handleShowModal}>
              How to Use Filters
            </Button>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>How to Use Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Use the filters to narrow down job results based on office, status, materials ordered, or installer. Simply select the desired filter options and the job table will update accordingly. You can combine multiple filters for more specific results.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover style={{ backgroundColor: '#641e1e', color: 'white' }}>
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
              <th>Materials Ordered</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
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
                    style={{
                      color: getStatusColor(job.status),
                      fontWeight: "bold",
                    }}
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    value={job.materialsOrdered}
                    onChange={(e) => {
                      const updatedJobs = [...jobs];
                      updatedJobs[index].materialsOrdered = e.target.value;
                      setJobs(updatedJobs);
                    }}
                    style={{
                        color: job.materialsOrdered === "Yes" ? "green" : "red",
                        fontWeight: "bold",
                      }}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={job.comments}
                    placeholder="Add a comment"
                    onChange={(e) => {
                      const updatedJobs = [...jobs];
                      updatedJobs[index].comments = e.target.value;
                      setJobs(updatedJobs);
                    }}
                  />
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
