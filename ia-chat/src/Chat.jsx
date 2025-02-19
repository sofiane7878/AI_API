import { useState, useEffect } from "react";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/conversations")
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error("Erreur chargement :", error));
    }, []);

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        fetch("http://localhost:5000/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_message: inputValue })
        })
        .then(response => response.json())
        .then(data => {
            setMessages(prev => [...prev, data]);
            setInputValue(""); 
        })
        .catch(error => console.error("Erreur envoi :", error));
    };

    return (
        <div className="chat-container">
            <h1>Chat IA </h1>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p><strong> Vous :</strong> {msg.user_message}</p>
                        <p><strong> IA :</strong> {msg.ai_message}</p>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Écrivez un message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={sendMessage}>Envoyer</button>
            </div>
        </div>
    );
}

export default Chat;
