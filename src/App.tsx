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
