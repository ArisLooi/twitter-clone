import { Col, Image, Row, Button } from "react-bootstrap";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sn={6} className="p-4">
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}></i>
                <p className="mt-5" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today.</h2>
                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                </Col>
            </Col>
        </Row>

    )
}