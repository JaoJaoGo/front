import { StrictMode } from 'react'
import { AuthProvider } from './context/AuthContext'
import { AuthorProvider } from './context/AuthorContext'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/themes.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AuthorProvider>
        <App />
      </AuthorProvider>
    </AuthProvider>
  </StrictMode>,
)
