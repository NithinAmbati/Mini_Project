import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CgProfile } from "react-icons/cg";
import Cookie from "js-cookie";
import "./index.css";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();

  const logout = () => {
    Cookie.remove("jwt_token");
    history.push("/login");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="height">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/" style={{ fontSize: "18px", color: "white" }}>
              Home
            </Nav.Link>

            <Nav.Link href="/jobs" style={{ fontSize: "18px", color: "white" }}>
              Jobs
            </Nav.Link>
            <Nav.Link
              href="/add-jobs"
              style={{ fontSize: "18px", color: "white" }}
            >
              Add Jobs
            </Nav.Link>
            <NavDropdown
              title={
                <span>
                  <CgProfile className="w-100 h-100" />
                </span>
              }
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
              <NavDropdown.Item>
                {" "}
                <button onClick={logout} className="logout">Logout</button>{" "}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
