import { createRoot } from 'react-dom/client'
import './index.css'
import SignIn from './screens/signin.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './screens/main-page.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}/>
      <Route path='/main-page' element={<MainPage/>} />
    </Routes>
  </BrowserRouter>
)
