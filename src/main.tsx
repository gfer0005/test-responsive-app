import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
// import "belfius.geui.client.ui/dist/belfius/lib/ui.js";
import "@mantine/core/styles.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
