import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function HomePage() {
  const [inputPseudo, setInputPseudo] = useState("");
  const { setPseudo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPseudo.trim() === "") return;
    setPseudo(inputPseudo);
    navigate("/quiz");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "440px",
        textAlign: "center",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
      }}>
        <div style={{
          width: "72px",
          height: "72px",
          background: "linear-gradient(135deg, #7c3aed, #2563eb)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          margin: "0 auto 24px",
        }}>
          🧠
        </div>

        <h1 style={{
          fontSize: "32px",
          fontWeight: "800",
          background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}>
          PolyQuiz
        </h1>

        <p style={{
          color: "#94a3b8",
          fontSize: "15px",
          marginBottom: "36px",
        }}>
          Testez vos connaissances sur la F1, NBA, MotoGP et les Mangas
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrez votre pseudo..."
            value={inputPseudo}
            onChange={(e) => setInputPseudo(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.08)",
              color: "#f1f5f9",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "15px",
              marginBottom: "16px",
              display: "block",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              color: "white",
              padding: "14px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              boxShadow: "0 8px 25px rgba(124, 58, 237, 0.4)",
            }}
          >
            Commencer le Quiz 🚀
          </button>
        </form>

        <div style={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
        }}>
          {["🏎️ F1", "🏀 NBA", "🏍️ MotoGP", "🎌 Manga"].map((cat) => (
            <span key={cat} style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "6px 12px",
              fontSize: "12px",
              color: "#94a3b8",
            }}>
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;