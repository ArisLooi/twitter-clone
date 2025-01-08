import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletePost, likePost, removeLikeFromPost } from "../features/posts/postsSlice"
import { AuthContext } from "./AuthProvider";
import UpdatePostModal from "./UpdatePostModal";
import profile from "../assets/profile.jpg"

export default function ProfilePostCard({ post }) {
    const { content, id: postId, imageUrl } = post;
    const [likes, setLikes] = useState([]);
    const pic = profile
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;
    // user has liked the post if their id is in the likes array
    const isLiked = likes.includes(userId);

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    // add userID to likes array
    const addToLikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    }

    // remove userID from likes array and update the backend
    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikeFromPost({ userId, postId }));
    }

    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
    };

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
                <Image src={imageUrl} style={{ width: 150 }} />
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>)}
                        {likes.length}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-pencil-square" onClick={handleShowUpdateModal}></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-trash" onClick={handleDelete}></i>
                    </Button>
                    <UpdatePostModal show={showUpdateModal} handleClose={handleCloseUpdateModal} postId={postId} originalPostContent={content} />

                </div>

            </Col>
        </Row>
    )
}