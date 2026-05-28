import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizEngine from "./pages/QuizEngine";
import ResultatsPage from "./pages/ResultatsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={
          <ProtectedRoute>
            <QuizEngine />
          </ProtectedRoute>
        } />
        <Route path="/resultats" element={
          <ProtectedRoute>
            <ResultatsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;