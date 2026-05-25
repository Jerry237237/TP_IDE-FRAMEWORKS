import { useState } from "react";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      titre: "Conception de l'ontologie",
      description: "Rédiger les axiomes de base du domaine.",
      statut: "A faire"
    },
    {
      id: 2,
      titre: "Tests unitaires",
      description: "Couvrir les modules critiques.",
      statut: "En cours"
    }
  ]);

  return (
    <div>
      <h1>TaskFlow</h1>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Dashboard;