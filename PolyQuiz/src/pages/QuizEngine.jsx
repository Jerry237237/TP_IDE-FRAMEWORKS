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
      return {
        ...etatInitial,
        statut: "en_cours"
      };

    case "ANSWER_QUESTION":
      const estCorrecte = action.reponse === action.bonneReponse;
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
      };

    case "FINISH_QUIZ":
      return {
        ...state,
        statut: "termine"
      };

    default:
      return state;
  }
}

function QuizEngine() {
  const [state, dispatch] = useReducer(quizReducer, etatInitial);
  const { data: questions, loading, error } = useFetch("/questions.json");
  const navigate = useNavigate();
  const { setMeilleurScore, meilleurScore } = useContext(UserContext);

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

  if (loading) return <p>Chargement des questions...</p>;
  if (error) return <p>Erreur : {error}</p>;

  const questionCourante = questions[state.indexQuestion];

  const handleReponse = (reponse) => {
    dispatch({
      type: "ANSWER_QUESTION",
      reponse: reponse,
      bonneReponse: questionCourante.bonne_reponse,
      totalQuestions: questions.length
    });
  };

  return (
    <div>
      <p>⏱ Temps restant : {tempsRestant}s</p>
      <p>Question {state.indexQuestion + 1} / {questions.length}</p>
      <p>Score : {state.score}</p>
      <h2>{questionCourante.libelle}</h2>
      <div>
        {questionCourante.options.map((option) => (
          <button key={option} onClick={() => handleReponse(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizEngine;