import { Navbar, Container, Button } from "react-bootstrap";

export default function ProfilePage() {
    const handleLogout = () => { };

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <i className="bi bi-twitter" style={{ fontSize: 30, color: "dodgerblue" }}></i>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-3">
                <h2>Your Profile</h2>
            </Container>
        </>
    )
}