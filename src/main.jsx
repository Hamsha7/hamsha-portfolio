import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize theme from localStorage
const saved = localStorage.getItem('theme')
if (saved === 'light') {
  document.documentElement.classList.add('light')
} else {
  document.documentElement.classList.remove('light')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

