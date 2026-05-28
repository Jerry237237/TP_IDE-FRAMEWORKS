import { useReducer, useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { UserContext } from "../context/UserContext";

const etatInitial = {
  indexQuestion: 0,
  score: 0,
  statut: "en_attente",
  reponseSelectionnee: null
};

function quizReducer(state, action) {
  switch (action.type) {
    case "START_QUIZ":
      return { ...etatInitial, statut: "en_cours" };

    case "ANSWER_QUESTION":
      { const estCorrecte = action.reponse === action.bonneReponse;
      const nouveauScore = estCorrecte ? state.score + 1 : state.score;
      const prochainIndex = state.indexQuestion + 1;

      if (prochainIndex >= action.totalQuestions) {
        return {
          ...state,
          score: nouveauScore,
          reponseSelectionnee: action.reponse,
          statut: "termine"
        };
      }

      return {
        ...state,
        score: nouveauScore,
        indexQuestion: prochainIndex,
        reponseSelectionnee: null
      }; }

    case "FINISH_QUIZ":
      return { ...state, statut: "termine" };

    default:
      return state;
  }
}

function QuizEngine() {
  const [state, dispatch] = useReducer(quizReducer, etatInitial);
  const { data: questions, loading, error } = useFetch("/questions.json");
  const navigate = useNavigate();
  const { setMeilleurScore, meilleurScore, pseudo } = useContext(UserContext);
  const [tempsRestant, setTempsRestant] = useState(60);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTempsRestant((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          dispatch({ type: "FINISH_QUIZ" });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (state.statut === "termine") {
      clearInterval(intervalRef.current);
      if (state.score > meilleurScore) {
        setMeilleurScore(state.score);
      }
      navigate("/resultats", { state: { score: state.score } });
    }
  }, [state.statut]);

  if (loading) return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#a78bfa",
      fontSize: "18px",
    }}>
      ⏳ Chargement des questions...
    </div>
  );

  if (error) return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ef4444",
    }}>
      ❌ Erreur : {error}
    </div>
  );

  const questionCourante = questions[state.indexQuestion];
  const progression = ((state.indexQuestion) / questions.length) * 100;
  const tempsColor = tempsRestant > 30 ? "#10b981" : tempsRestant > 10 ? "#f59e0b" : "#ef4444";

  const handleReponse = (reponse) => {
    dispatch({
      type: "ANSWER_QUESTION",
      reponse: reponse,
      bonneReponse: questionCourante.bonne_reponse,
      totalQuestions: questions.length
    });
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
        width: "100%",
        maxWidth: "600px",
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "10px 18px",
            fontSize: "14px",
            color: "#94a3b8",
          }}>
            👤 {pseudo}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${tempsColor}`,
            borderRadius: "12px",
            padding: "10px 18px",
            fontSize: "16px",
            fontWeight: "700",
            color: tempsColor,
          }}>
            ⏱ {tempsRestant}s
          </div>

          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "10px 18px",
            fontSize: "14px",
            color: "#a78bfa",
            fontWeight: "700",
          }}>
            {state.score} pts
          </div>
        </div>

        {/* Barre de progression */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          height: "6px",
          marginBottom: "24px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progression}%`,
            background: "linear-gradient(90deg, #7c3aed, #2563eb)",
            borderRadius: "999px",
            transition: "width 0.5s ease",
          }} />
        </div>

        {/* Carte question */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "36px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            borderRadius: "8px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: "700",
            marginBottom: "16px",
            letterSpacing: "1px",
          }}>
            {questionCourante.categorie.toUpperCase()}
          </div>

          <p style={{
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "12px",
          }}>
            Question {state.indexQuestion + 1} sur {questions.length}
          </p>

          <h2 style={{
            fontSize: "20px",
            fontWeight: "700",
            lineHeight: "1.5",
            marginBottom: "28px",
            color: "#f1f5f9",
          }}>
            {questionCourante.libelle}
          </h2>

          {/* Options */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}>
            {questionCourante.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleReponse(option)}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  padding: "16px",
                  color: "#f1f5f9",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124, 58, 237, 0.3)";
                  e.currentTarget.style.border = "1px solid #7c3aed";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{
                  width: "28px",
                  height: "28px",
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}>
                  {["A", "B", "C", "D"][index]}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizEngine;