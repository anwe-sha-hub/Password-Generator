import React from 'react'                  // ← needed for JSX if automatic transform isn’t working
import ReactDOM from 'react-dom/client'
import App from './App'
import './tailwind.css'                     // ← import Tailwind once here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
