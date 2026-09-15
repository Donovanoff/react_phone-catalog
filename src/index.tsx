import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './context/AppContext';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>,
);
