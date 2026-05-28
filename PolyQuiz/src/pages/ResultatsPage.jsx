import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
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

  return (
    <div>
      <h1>Résultats</h1>
      <p>Joueur : {pseudo}</p>
      <p>Score : {score} / {totalQuestions}</p>
      <p>Ratio de bonnes réponses : {ratio}%</p>
      <p>Meilleur score : {meilleurScore} / {totalQuestions}</p>
      <button onClick={() => navigate("/quiz")}>
        Rejouer
      </button>
      <button onClick={() => navigate("/")}>
        Changer de joueur
      </button>
    </div>
  );
}

export default ResultatsPage;