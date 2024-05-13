import { Navbar, Nav, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link className={classes.navTexts}>
            <Navbar.Brand to="/">
              {" "}
              <img src={logo} alt="ProShop" />
              ProShop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${classes.active} ${classes.navTexts} `
                    : `${classes.navTexts} ${classes.invisibleBorder}`
                }
                to="/product"
              >
                Products
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${classes.active} ${classes.navTexts} `
                    : `${classes.navTexts} ${classes.invisibleBorder}`
                }
                to="/offers"
              >
                Offers
              </NavLink>
              <Nav.Link href="/cart">
                <FaShoppingCart />
                Cart
              </Nav.Link>

              <Nav.Link href="/login">
                <FaUser />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
