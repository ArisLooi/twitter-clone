import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ChatbotModal({ show, handleClose }) {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const API_URL = "https://api.openai.com/v1/chat/completions"
        // const apiKey = "";
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        const messagesToSend = [
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ];

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messagesToSend
            })
        })

        const data = await response.json();

        if (data) {
            let newAllMessages = [
                ...messagesToSend,
                data.choices[0].message
            ]
            setAllMessages(newAllMessages)
            setMessage('')
        }
    }
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className="fs-4">
                AI Chatbot
            </Modal.Header>
            <Modal.Body>
                <div>
                    {allMessages.map((msg, index) => (
                        <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
                    ))}
                </div>

                <Form onSubmit={sendMessage}>
                    <Form.Control
                        type="text"
                        placeholder="Ask chatbot something..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button type="submit" className="mt-3">Send</Button>
                </Form>

            </Modal.Body>
        </Modal>
    )
}