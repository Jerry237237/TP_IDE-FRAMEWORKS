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
    <div>
      <h1>Bienvenue sur PolyQuiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez votre pseudo"
          value={inputPseudo}
          onChange={(e) => setInputPseudo(e.target.value)}
        />
        <button type="submit">Commencer le quiz</button>
      </form>
    </div>
  );
}

export default HomePage;