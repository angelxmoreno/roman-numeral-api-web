import React, { FC, useState } from 'react';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import NavItemLink from '@/layout/NavItemLink';

const NavBarTop: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar dark color="dark" light expand="md">
      <Container>
        <NavbarBrand>Roman Numeral API</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItemLink to="/" label="Home" />
            <NavItemLink to="/about" label="About" />
            <NavItemLink to="/register" label="Register" />
            <NavItemLink to="/login" label="Log In" />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarTop;
