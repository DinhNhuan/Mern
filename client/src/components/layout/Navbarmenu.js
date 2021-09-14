import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbarmenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const onLogout = () => {
    logoutUser();
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-border text-white">
        <img
          src={learnItLogo}
          alt="LearnItLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        LearnIt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-between align-items-center"
      >
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-border text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>

          <Nav.Link
            className="font-weight-border text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="font-weight-border text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="success"
            className="font-weight-bolder text-white"
            onClick={onLogout}
          >
            <img src={logoutIcon} alt="logoutIcon" width="32" height="32" />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbarmenu;
