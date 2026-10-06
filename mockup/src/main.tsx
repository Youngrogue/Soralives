import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(<App isLibrary={/^\/library(?:\/|\/index\.html)?$/.test(window.location.pathname)} />);
