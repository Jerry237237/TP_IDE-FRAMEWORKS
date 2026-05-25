function TaskCard({ task }) {
    return (
        <div>
            <h3>{task.titre}</h3>
            <p>{task.description}</p>
            <span>{task.status}</span>
        </div>
    ); 
}

export default TaskCard;