import { Link } from "react-router-dom";

function TaskCard({ task }) {
  return (
    <Link to={`/task/${task._id}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span>{task.status}</span>
      </div>
    </Link>
  );
}

export default TaskCard;