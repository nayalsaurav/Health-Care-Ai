import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ChatProvider } from './store/ChatContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
    <ChatProvider><App /> </ChatProvider>
    </BrowserRouter>
  </StrictMode>,
)
