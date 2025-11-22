import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryclient = new QueryClient();
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryclient}>
  <Toaster/>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
