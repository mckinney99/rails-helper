import {Navbar, Container} from 'react-bootstrap';

export default function Navigation() {
  return(
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Rails Helper</Navbar.Brand>
            <div className="nav-description">
              A tool for making rails generate commands easily
            </div>
        </Container>
      </Navbar>
    </div>
  )
}
