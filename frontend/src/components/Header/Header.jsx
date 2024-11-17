import { Link } from "react-router-dom";
import { useHeader } from "./useHeader.hook";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export function Header() {
  const { username, handleLogout } = useHeader();
  return (
    <>
      {username && (
        <Navbar bg="primary" expand="lg" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">BlogList App</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              className="bg-white"
            >
              <Offcanvas.Header closeButton>
                {/* <Offcanvas.Title id="offcanvasNavbarLabel">
                  BlogList Appp
                </Offcanvas.Title> */}
                <div className="user-container">
                  <span className="user">{`${username} 👨🏻 logged in `}</span>
                  {/* <Button variant="outline-light" onClick={handleLogout}>
                    logout
                  </Button> */}
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="me-auto">
                  <Link to="/">
                    <Nav.Link href="#home">Blogs</Nav.Link>
                  </Link>
                  <Link to="/users">
                    <Nav.Link href="#users">Users</Nav.Link>
                  </Link>
                </Nav>
                <div className="user-container d-none d-lg-block">
                  <span className="user">{`${username} 👨🏻 `}</span>
                  <Button variant="outline-light" onClick={handleLogout}>
                    logout
                  </Button>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    className="d-block d-lg-none"
                    variant="outline-secondary"
                    onClick={handleLogout}
                  >
                    logout
                  </Button>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
}
