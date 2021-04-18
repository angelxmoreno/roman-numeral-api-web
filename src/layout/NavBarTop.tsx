import React, { FC, useState } from 'react';
import {
  Collapse,
  Container,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import NavItemLink from '@/layout/NavItemLink';
import MyAccountDropDown from '@/layout/MyAccountDropDown';

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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                My Account
              </DropdownToggle>
              <MyAccountDropDown />
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarTop;
