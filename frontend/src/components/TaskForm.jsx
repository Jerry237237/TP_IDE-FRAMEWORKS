import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState("A faire");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      description: description,
      statut: statut
    };

    onAddTask(nouvelleTache);
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={titre}
          placeholder="Titre de la tâche"
          onChange={(e) => setTitre(e.target.value)}
        />

        <input
          type="text"
          value={description}
          placeholder="Description de la tâche"
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
        >
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Termine">Termine</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default TaskForm;