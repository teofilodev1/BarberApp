import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/login.jsx';
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}