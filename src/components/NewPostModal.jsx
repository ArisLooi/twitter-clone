import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");

    const handleSave = () => {
        // Get stored JWT Token
        const token = localStorage.getItem("authToken");

        // Decode the token to fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id // May change depending on how the server encode the token

        // Prepare data to be sent
        const data = {
            title: "Post Title", //Add functionality to set this properly
            content: postContent,
            user_id: userId,
        };

        // Make you API call here
        axios
            .post("https://7e27c269-897c-43f3-828e-b4868ad585c2-00-2r5fr76a35h0r.pike.replit.dev/posts", data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error", error);
            })

    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="postContent">
                                <Form.Control
                                    placeholder="What is happening?!"
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => setPostContent(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className="rounded-pill"
                            onClick={handleSave}
                        >
                            Tweet
                        </Button>
                    </Modal.Footer>
                </Modal.Header>
            </Modal>
        </>
    )
}