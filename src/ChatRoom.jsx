import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "./auth/AuthContext";

const API = import.meta.env.VITE_API;

export default function ChatRoom() {
  const { tripId } = useParams();
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Load all messages for this trip
  async function loadMessages() {
    const response = await fetch(`${API}/trips/${tripId}/chat`);
    const data = await response.json();
    setMessages(data);
  }

  useEffect(() => {
    loadMessages();
  }, [tripId]);

  // Send a new message (requires being logged in)
  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`${API}/trips/${tripId}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: text }),
    });
    setText("");
    loadMessages();
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Group Chat</h2>
      <div style={{ border: "1px solid #ccc", padding: 12, minHeight: 300 }}>
        {messages.length === 0 && <p>No messages yet — say hi! 👋</p>}
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 10 }}>
            <strong>{m.sender_name || "You"}</strong>{" "}
            <span style={{ color: "#888", fontSize: 12 }}>
              {new Date(m.created_at).toLocaleTimeString()}
            </span>
            <div>{m.body}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}