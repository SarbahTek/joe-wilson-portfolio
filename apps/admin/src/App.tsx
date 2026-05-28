import React from "react";

export default function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      color: "#fff",
      fontFamily: "'Inter', system-ui, sans-serif",
      gap: "1rem",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1.5rem",
        padding: "3rem 4rem",
        textAlign: "center",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚡</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Joe Wilson Admin
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: "1.5rem" }}>
          Dashboard scaffold ready — start building admin pages here.
        </p>
        <div style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {["Courses", "Masterclasses", "Users", "Uploads", "Analytics"].map((item) => (
            <span key={item} style={{
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              borderRadius: "2rem",
              padding: "0.4rem 1rem",
              fontSize: "0.85rem",
              color: "#c4b5fd",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
        Running on localhost:5174
      </p>
    </div>
  );
}
