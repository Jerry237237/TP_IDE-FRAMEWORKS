import { Link } from "react-router-dom";

function TaskCard({ task }) {
  return (
    <Link to={`/task/${task.id}`}>
      <div>
        <h3>{task.titre}</h3>
        <p>{task.description}</p>
        <span>{task.statut}</span>
      </div>
    </Link>
  );
}

export default TaskCard;