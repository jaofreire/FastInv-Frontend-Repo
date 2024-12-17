import './index.css'
import { createRoot } from 'react-dom/client'
import SignIn from './screens/signin.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './screens/main-page.tsx'
import InventoryTable from './screens/inventory-table.tsx'
import MyTables from './screens/my-tables.tsx'
import MovementHistory from './screens/movement-history.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/main-page' element={<MainPage />} />
      <Route path='/my-tables' element={<MyTables />} />
      <Route path='/inventory-table/:tableName/:id' element={<InventoryTable />} />
      <Route path='/movement-history' element={<MovementHistory />} />
    </Routes>
  </BrowserRouter>
)
