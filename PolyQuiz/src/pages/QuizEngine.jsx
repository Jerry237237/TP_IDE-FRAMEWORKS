import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

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

  if (state.statut === "termine") {
    navigate("/resultats");
  }

  return (
    <div>
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