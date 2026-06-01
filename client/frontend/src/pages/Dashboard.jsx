import useLocalStorage from "../hooks/useLocalStorage";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useLocalStorage("taskflow_data", [
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