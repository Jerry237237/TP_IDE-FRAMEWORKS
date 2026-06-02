import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Erreur chargement tâches :", err));
  }, []);

  const handleAddTask = async (nouvelleTache) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: nouvelleTache.titre,
          description: nouvelleTache.description,
          status: nouvelleTache.statut
        })
      });

      if (response.status === 201) {
        const taskCreee = await response.json();
        setTasks([...tasks, taskCreee]);
      }
    } catch (err) {
      console.error("Erreur ajout tâche :", err);
    }
  };

  return (
    <div>
      <h1>TaskFlow</h1>
      <TaskForm onAddTask={handleAddTask} />
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Dashboard;