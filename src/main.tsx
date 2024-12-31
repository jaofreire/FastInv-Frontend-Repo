import './index.css'
import { createRoot } from 'react-dom/client'
import SignIn from './screens/signin.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './screens/main-page.tsx'
import InventoryTable from './screens/inventory-table.tsx'
import MyTables from './screens/my-tables.tsx'
import MovementHistory from './screens/movement-history.tsx'
import { AuthProvider } from './contexts/auth/auth-provider.tsx'
import ProtectedRoute from './route/protected-route.tsx'
import UserProfile from './screens/user-profile.tsx'
import AllUsers from './screens/all-users.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />

        <Route path='/main-page' element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>} />

        <Route path='/user-profile' element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>} />

        <Route path='/my-tables' element={
          <ProtectedRoute>
            <MyTables />
          </ProtectedRoute>} />

        <Route path='/employees' element={
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>} />

        <Route path='/inventory-table/:tableName/:id' element={
          <ProtectedRoute>
            <InventoryTable />
          </ProtectedRoute>} />

        <Route path='/movement-history' element={
          <ProtectedRoute>
            <MovementHistory />
          </ProtectedRoute>

        } />
      </Routes>
    </BrowserRouter >
  </AuthProvider>
)
