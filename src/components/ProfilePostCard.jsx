import { Button, Col, Image, Row } from "react-bootstrap";
import profile from "../assets/profile.jpg"

export default function ProfilePostCard() {
    const pic = profile

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D#D#D#"
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Aris</strong>
                <span>@aris.looi · Apr 11</span>
                <p>Heyyyy</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                </div>
                <Button variant="light">
                    <i className="bi bi-repeat"></i>
                </Button>
                <Button variant="light">
                    <i className="bi bi-heart"></i>
                </Button>
                <Button variant="light">
                    <i className="bi bi-graph-up"></i>
                </Button>
                <Button variant="light">
                    <i className="bi bi-upload"></i>
                </Button>
            </Col>
        </Row>
    )
}