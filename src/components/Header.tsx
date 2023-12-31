import { useState } from 'react';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, NavbarBrand, Input, Button, Form, DropdownMenu, Dropdown, DropdownItem } from 'reactstrap';

export default function Header(){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="lg">
      <div className="container-fluid">
        <NavbarBrand href="/">Navbar</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/quiz" active>Criar Quiz</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="/account" active>Conta</NavLink>
            </NavItem>
          </Nav>
          <Form className="d-flex" role="search">
            <Input type="search" placeholder="Search" aria-label="Search" />
            <Button outline color="success" type="submit">Search</Button>
          </Form>
        </Collapse>
      </div>
    </Navbar>
  )
}