import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Exercises } from './pages/Exercises';
import { ExerciseDetail } from './pages/ExerciseDetail';
import { Nutrition } from './pages/Nutrition';
import { Progress } from './pages/Progress';
import { AICoach } from './pages/AICoach';
import { Onboarding } from './components/Onboarding';

export default function App() {
  return (
    <AppProvider>
      <Onboarding />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="exercises/:id" element={<ExerciseDetail />} />
            <Route path="coach" element={<AICoach />} />
            <Route path="nutrition" element={<Nutrition />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
