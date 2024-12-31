import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import profile from "../assets/profile.jpg"

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState(0);
    const pic = profile

    useEffect(() => {
        fetch(
            `https://7e27c269-897c-43f3-828e-b4868ad585c2-00-2r5fr76a35h0r.pike.replit.dev/likes/post/${postId}`
        )
            .then((response) => response.json())
            .then((data) => setLikes(data.length))
            .catch((error) => console.error("Error:", error));
    }, [postId]);

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Aris</strong>
                <span>@aris.looi · Apr 11</span>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-heart">{likes}</i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>

            </Col>
        </Row>
    )
}