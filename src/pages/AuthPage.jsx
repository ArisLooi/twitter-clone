import { Col, Image, Row } from "react-bootstrap";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
        </Row>
    )
}