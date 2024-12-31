import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Image, Nav, Row } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import profile from "../assets/profile.jpg"
import banner from "../assets/banner.jpg"

export default function ProfileMidBody() {
    const [posts, setPosts] = useState([]);
    const url = banner
    const pic = profile

    // Fetch posts based on user id
    const fetchPosts = (userId) => {
        fetch(
            `https://7e27c269-897c-43f3-828e-b4868ad585c2-00-2r5fr76a35h0r.pike.replit.dev/posts/user/${userId}`
        ).then((response) => response.json()).then((data) => setPosts(data)).catch((error) => console.error("Error:", error))
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchPosts(userId);
        }
    }, []);

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={url} fluid height />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #f8f9fa",
                    marginLeft: 15,
                }}
            />
            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>Aris</p>
            <p style={{ marginBottom: "2px" }}>@aris.looi</p>
            <p>I help people build their dream software at Sigma Lab</p>
            <p>Software Developer</p>
            <p><strong>271</strong> Following <strong>610</strong> Followers </p>
            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-4">Likes</Nav.Link>
                </Nav.Item>

            </Nav>
            {posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} />
            ))}
        </Col>
    )
}