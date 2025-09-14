import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render( //root elementi index.htmlist otsib ja jooksutab seal rakendust justkui single page
  <StrictMode>
    <App />
  </StrictMode>,
)
