import { useState } from "react";
import { showAlert } from "../../components/ui/alert";
import "./Cadastro.css";

function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const handleCadastro = async (e) => {  // ← async
  e.preventDefault();
  if (senha !== confirmarSenha) {
    showAlert("As senhas não coincidem", "warning");
    return;
  }
  try {
    const res = await fetch("http://localhost:3000/api/cadastro", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha, nome, telefone }),
    });

    const data = await res.json(); 

    if (!res.ok) {
      showAlert(data.erro || "Erro ao cadastrar", "error"); 
      return;
    }

    showAlert("Usuário cadastrado com sucesso!", "success");

  } catch {
    showAlert("Erro de conexão", "error");
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleCadastro}
          className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
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
            <label className="block text-gray-700 mb-2" htmlFor="telefone">
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="confirmar-senha"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmar-senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition duration-200"
          >
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CadastroPage;
