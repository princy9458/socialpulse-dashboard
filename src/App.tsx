<<<<<<< HEAD
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { initAnalytics, trackPageView } from './analytics';
import './index.css';

const App = (): JSX.Element => {
  useEffect(() => {
    initAnalytics();
    trackPageView();
  }, []);

  return <Dashboard />;
};

export default App;
=======
import "./index.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;
>>>>>>> 2236a15784afac7ab16982ec8273df530c81166b
