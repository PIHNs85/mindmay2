
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('[LOG][main.tsx]: Root being mounted');
createRoot(document.getElementById("root")!).render(<App />);
