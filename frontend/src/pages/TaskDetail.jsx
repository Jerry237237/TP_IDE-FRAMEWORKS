import { useParams, Link } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();

  const donneesSauvegardees = localStorage.getItem("taskflow_data");
  const tasks = JSON.parse(donneesSauvegardees);

  const task = tasks.find(t => t.id === Number(id));

  return (
    <div>
      <Link to="/">Retour au Dashboard</Link>
      <h1>{task.titre}</h1>
      <p>{task.description}</p>
      <span>{task.statut}</span>
    </div>
  );
}

export default TaskDetail;