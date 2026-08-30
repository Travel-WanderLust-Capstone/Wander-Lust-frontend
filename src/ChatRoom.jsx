import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "./auth/AuthContext";

const API = import.meta.env.VITE_API;

const TEAL = "rgb(38, 155, 155)";

export default function ChatRoom() {
  const { tripId } = useParams();
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function loadMessages() {
    const response = await fetch(`${API}/trips/${tripId}/chat`, {
      cache: "no-store",
    });
    const data = await response.json();
    setMessages(data);
  }

  useEffect(() => {
    loadMessages();
  }, [tripId]);

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    await fetch(`${API}/trips/${tripId}/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body: text, mediaUrl: imageUrl }),
    });
    setText("");
    setImageUrl("");
    loadMessages();
  }

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: 5,
    border: `1px solid ${TEAL}`,
    fontSize: "1rem",
  };

  return (
    <div style={{ maxWidth: 600, margin: "1rem auto", padding: "0 1rem" }}>
      <h2 className="title-card" style={{ padding: "1rem" }}>
        Group Chat
      </h2>

      <div
        style={{
          backgroundColor: "transparent",
          borderRadius: 5,
          padding: "1rem",
          minHeight: 320,
          marginBottom: "1rem",
        }}
      >
        {messages.length === 0 && (
          <p className="description-card">No messages yet — say hi! 👋</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              backgroundColor: "rgb(245, 240, 225)",
              borderRadius: 5,
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <strong style={{ color: TEAL }}>{m.sender_name || "You"}</strong>{" "}
            <span style={{ color: "#888", fontSize: "0.8rem" }}>
              {new Date(m.created_at).toLocaleTimeString()}
            </span>
            <div>{m.body}</div>
            {m.media_url && (
              <img
                src={m.media_url}
                alt=""
                style={{
                  maxWidth: 240,
                  display: "block",
                  marginTop: "0.5rem",
                  borderRadius: 5,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message…"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button type="submit" style={{ margin: 0 }}>
            Send
          </button>
        </div>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste an image link (optional)…"
          style={{
            ...inputStyle,
            width: "100%",
            marginTop: "0.5rem",
            boxSizing: "border-box",
          }}
        />
      </form>
    </div>
  );
}
