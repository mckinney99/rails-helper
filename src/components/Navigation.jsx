import {Navbar, Container, Nav} from 'react-bootstrap';

export default function Navigation() {
  return(
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Rails Helper</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/tables">Tables</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
