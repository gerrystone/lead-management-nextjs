import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
export default function Header(props){
    return (
        <>
            {
                props.type==="user" ? <>
                    <Navbar bg="light" expand="lg" className={"border-bottom"}>
                        <Container>
                            <Navbar.Brand href="#home">Lead Mgt</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto mx-5 d-flex justify-content-end">
                                    <Nav.Link href="/admin">Home</Nav.Link>
                                </Nav>
                                <Nav className={"d-flex justify-content-end"}>
                                    <NavDropdown title="Username" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </> : <>
                    <Navbar bg="light" expand="lg" className={"border-bottom"}>
                        <Container>
                            <Navbar.Brand href="#home">Lead Mgt</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto mx-5 d-flex justify-content-end">
                                    <Nav.Link href="/admin">Home</Nav.Link>
                                    <Nav.Link href="#link">Users</Nav.Link>
                                    <Nav.Link href="#link">Customers</Nav.Link>
                                    <Nav.Link href="#link">Leads</Nav.Link>

                                </Nav>
                                <Nav className={"d-flex justify-content-end"}>
                                    <NavDropdown title="Username" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>

                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </>
            }

        </>
    )
}