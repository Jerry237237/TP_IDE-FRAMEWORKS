import { useMemo, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ResultatsPage() {
  const { pseudo, meilleurScore } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score ?? 0;
  const totalQuestions = 10;

  const ratio = useMemo(() => {
    const pourcentage = (score / totalQuestions) * 100;
    return pourcentage.toFixed(1);
  }, [score]);

  const getMedaille = () => {
    if (ratio >= 80) return { emoji: "🥇", label: "Excellent !", color: "#f59e0b" };
    if (ratio >= 60) return { emoji: "🥈", label: "Bien joué !", color: "#94a3b8" };
    if (ratio >= 40) return { emoji: "🥉", label: "Pas mal !", color: "#cd7c4a" };
    return { emoji: "💪", label: "Continue !", color: "#7c3aed" };
  };

  const medaille = getMedaille();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
      }}>

        {/* Carte principale */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "48px 40px",
          textAlign: "center",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          marginBottom: "16px",
        }}>

          {/* Médaille */}
          <div style={{
            fontSize: "64px",
            marginBottom: "16px",
          }}>
            {medaille.emoji}
          </div>

          <h1 style={{
            fontSize: "28px",
            fontWeight: "800",
            color: medaille.color,
            marginBottom: "8px",
          }}>
            {medaille.label}
          </h1>

          <p style={{
            color: "#94a3b8",
            fontSize: "15px",
            marginBottom: "32px",
          }}>
            Bien joué {pseudo} !
          </p>

          {/* Score principal */}
          <div style={{
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
          }}>
            <p style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "8px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              Score final
            </p>
            <p style={{
              fontSize: "52px",
              fontWeight: "800",
              color: "white",
              lineHeight: 1,
            }}>
              {score}<span style={{ fontSize: "24px", opacity: 0.7 }}>/{totalQuestions}</span>
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "32px",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "16px",
            }}>
              <p style={{
                fontSize: "12px",
                color: "#94a3b8",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                Ratio
              </p>
              <p style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#a78bfa",
              }}>
                {ratio}%
              </p>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "16px",
            }}>
              <p style={{
                fontSize: "12px",
                color: "#94a3b8",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                Meilleur
              </p>
              <p style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#f59e0b",
              }}>
                {meilleurScore}/{totalQuestions}
              </p>
            </div>
          </div>

          {/* Boutons */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            <button
              onClick={() => navigate("/quiz")}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "white",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "700",
                boxShadow: "0 8px 25px rgba(124, 58, 237, 0.4)",
              }}
            >
              🔄 Rejouer
            </button>

            <button
              onClick={() => navigate("/")}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#f1f5f9",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              👤 Changer de joueur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultatsPage;