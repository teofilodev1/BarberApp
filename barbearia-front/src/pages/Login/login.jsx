import { useState } from 'react';
import { showAlert } from '../../components/ui/alert'
import './login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
      try {
          const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, senha })
        });
        const data = await res.json()
    if (!res.ok) {
      showAlert(data.erro || "Erro ao realizar login", "error"); 
      return;
    }
    showAlert("Login realizado com sucesso!", "success");
  } catch {
    showAlert("Erro de conexão", "error");
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition duration-200">Entrar</button>
          <a href="/cadastro" className="block text-center mt-4 text-sm text-gray-600 hover:text-gray-800">Não tem uma conta? Cadastre-se</a>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;