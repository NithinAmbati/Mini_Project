// src/components/CollapsibleExample.js
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.css"; // Import the custom CSS

function CollapsibleExample() {
  const [activeLink, setActiveLink] = useState("");

  const handleSelect = (selectedKey) => {
    setActiveLink(selectedKey);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto"
            activeKey={activeLink}
            onSelect={handleSelect}
          >
            <Nav.Link
              href="/company-reviews"
              eventKey="company-reviews"
              className={activeLink === "features" ? "active" : ""}
            >
              Company Reviews
            </Nav.Link>
            <Nav.Link
              href="/salary-guide"
              eventKey="salary-guide"
              className={activeLink === "pricing" ? "active" : ""}
            >
              SalaryGuide
            </Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item
                href="/"
                eventKey="action1"
                onClick={() => handleSelect("action1")}
              >
                Action
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                eventKey="action2"
                onClick={() => handleSelect("action2")}
              >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                eventKey="action3"
                onClick={() => handleSelect("action3")}
              >
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.4"
                eventKey="action4"
                onClick={() => handleSelect("action4")}
              >
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav activeKey={activeLink} onSelect={handleSelect}>
            <Nav.Link
              href="/login"
              eventKey="login"
              className={activeLink === "deets" ? "active" : ""}
            >
              Sign In
            </Nav.Link>
            <Nav.Link
              eventKey="job-posting"
              href="/job-posting"
              className={activeLink === "memes" ? "active" : ""}
            >
              Employer / Post Job
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
