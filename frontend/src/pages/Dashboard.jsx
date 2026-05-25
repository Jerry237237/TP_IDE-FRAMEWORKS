import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const donneesSauvegardees = localStorage.getItem("taskflow_data");
    if (donneesSauvegardees) {
      return JSON.parse(donneesSauvegardees);
    }
    return [
      {
        id: 1,
        titre: "Conception de l'ontologie",
        description: "Rédiger les axiomes de base du domaine.",
        statut: "A faire"
      },
      {
        id: 2,
        titre: "Test conceptuel",
        description: "Gerer les modules et dépandances.",
        statut: "En cours"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("taskflow_data", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (nouvelleTache) => {
    setTasks([...tasks, nouvelleTache]);
  };

  return (
    <div>
      <h1>TaskFlow</h1>
      <TaskForm onAddTask={handleAddTask} />
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Dashboard;