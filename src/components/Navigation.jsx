import {Navbar, Container} from 'react-bootstrap';
import React from 'react'

export default function Navigation() {
  return(
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Rails Helper</Navbar.Brand>
            <div className="nav-description">
              A tool for making rails generate commands easily
            </div>
        </Container>
      </Navbar>
    </div>
  )
}
