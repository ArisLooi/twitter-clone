import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const handleSave = () => {
        dispatch(savePost({ userId, postContent, file }));
        handleClose();
        setPostContent("");
        setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
                                <br />
                                <Form.Control type="file" onChange={handleFileChange} />
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