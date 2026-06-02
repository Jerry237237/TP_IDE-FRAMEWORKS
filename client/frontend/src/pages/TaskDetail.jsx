import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        const taskTrouvee = data.find(t => t._id === id);
        setTask(taskTrouvee);
      })
      .catch((err) => console.error("Erreur :", err));
  }, [id]);

  if (!task) return <p>Chargement...</p>;

  return (
    <div>
      <Link to="/">← Retour au Dashboard</Link>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <span>{task.status}</span>
    </div>
  );
}

export default TaskDetail;