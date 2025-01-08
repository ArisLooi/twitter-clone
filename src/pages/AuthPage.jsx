import { GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { Col, Image, Row, Button, Modal, Form, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showResetModal, setShowResetModal] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/profile");
    }, [currentUser, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, username, password);
            console.log(res.user);
        } catch (error) {
            console.error(error);
        };
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
            setError(""); // Clear any previous error
        } catch (error) {
            console.error(error);
            setError("Invalid email or password. Please try again."); // Set error message
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Failed to sign in with Google. Please try again."); // Set error message
        }
    }

    const facebookProvider = new FacebookAuthProvider(); const handleFacebookLogin = async (e) => {
        e.preventDefault(); try { await signInWithPopup(auth, facebookProvider); setError(""); } catch (error) {
            console.error(error); setError("Failed to sign in with Facebook. Please try again."); // Set error message 
        }
    };

    const handleClose = () => {
        setModalShow(null);
        setError("");
    }


    const handleShowResetModal = () => {
        setShowResetModal(true);
        setError("");
        setMessage("");
    }

    const handleCloseResetModal = () => {
        setShowResetModal(false);
        setResetEmail("");
        setError("");
        setMessage("");
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setMessage("Password reset email sent. Please check your inbox");
            setError("")
        } catch (error) {
            console.error(error);
            setError("Failed to send password reset email. Please try again.")
            setMessage("");
        }
    }

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
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleFacebookLogin}>
                        <i className="bi bi-facebook"></i> Sign up with Facebook
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>Create an account</Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                    </p>
                    <p className="mt-5" style={{ fontWeight: "bold" }}>Already have an account?</p>
                    <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign in</Button>
                    <p className="text-center"> <a href="#" onClick={handleShowResetModal}>Forgot password?</a> </p>
                </Col>
                <Modal show={modalShow != null} onHide={handleClose} animation={false} centered>
                    <Modal.Body >
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Log in to your account"
                            }
                        </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>

                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>
                            <Button className="rounded-pill" type="submit">
                                {modalShow === "SignUp" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={showResetModal} onHide={handleCloseResetModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header> <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handlePasswordReset}>
                            <Form.Group className="mb-3" controlId="formResetEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} /> </Form.Group>
                            <Button variant="primary" type="submit">
                                Send Password Reset Email
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>

        </Row >

    )
}
