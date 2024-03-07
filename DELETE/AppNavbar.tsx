import { type FC, type ReactNode } from 'react'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
type AppNavbarProps = {
  image: {
    src: string
    alt: string
  } // Assuming Logo is a React component
  children: ReactNode
}

const AppNavbar: FC<AppNavbarProps> = ({ image, children }) => {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <img {...image} />
        <Navbar.Brand href='#home'>{children}</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='justify-content-end'>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
            <NavLink to='/products' className='nav-link'>
              Products
            </NavLink>
            <NavLink to='/about' className='nav-link'>
              About
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
