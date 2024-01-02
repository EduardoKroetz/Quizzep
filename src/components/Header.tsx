// src/components/Header.tsx

import { useState } from 'react';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, NavbarBrand, Input, Button, Form, DropdownMenu, Dropdown, DropdownItem } from 'reactstrap';
import Search from './Search';

export default function Header(){
  const [searchInput,setSearchInput] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [searchIsOpen,setSearchIsOpen] = useState<boolean>(false)

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>

      <Navbar color="light" light expand="lg" >
        <div className="container-fluid row">
          <NavbarBrand href="/" className='col-9'><span className='display-6'>Quizzep</span></NavbarBrand>
          <NavbarToggler onClick={toggle} className='col-2'/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto d-flex col-12 col-md-6" navbar>
              <NavItem className='col-12 col-md-3'>
                <NavLink href="/quiz" active>Criar Quiz</NavLink>
              </NavItem>
              <NavItem className='col-12 col-md-3 '>
              <NavLink href="/account" active>Conta</NavLink>
              </NavItem>
            </Nav>
            <Form className="d-flex col-12 col-md-6" style={{gap:'3rem'}} role="search">
              <Input type="search" placeholder="Pesquisar Quizz" aria-label="Search" value={searchInput} onChange={(ev)=> setSearchInput(ev.target.value)}/>
              <Button outline color="success" type="button" onClick={()=> setSearchIsOpen(true)}>Procurar</Button>
            </Form>
          </Collapse>
        </div>
      </Navbar>
      <Search  searchIsOpen={searchIsOpen} setSearchIsOpen={setSearchIsOpen} searchInput={searchInput}/>
    </>
  )
}