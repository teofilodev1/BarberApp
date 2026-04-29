import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/login.jsx';
import CadastroPage from '../pages/Cadastro/cadastro.jsx';
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </BrowserRouter>
  )
}