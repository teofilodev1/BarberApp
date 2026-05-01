import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/login.jsx';
import CadastroPage from '../pages/Cadastro/cadastro.jsx';
import HomePage from '../pages/Home/home.jsx'
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/admin" element={<criarService/>}/>
      </Routes>
    </BrowserRouter>
  )
}