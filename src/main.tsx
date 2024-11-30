import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignIn from './screens/signin.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}/>
    </Routes>
  </BrowserRouter>
)
