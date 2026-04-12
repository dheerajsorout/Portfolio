import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './theme-system.css'
import { ThemeProvider, applyThemeToDocument, getInitialTheme } from './context/ThemeContext.jsx'

applyThemeToDocument(getInitialTheme())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
