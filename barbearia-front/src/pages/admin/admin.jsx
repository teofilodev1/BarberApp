import { useState, useEffect } from "react";
import { showAlert } from "../../components/ui/alert";
import "./admin.css";

// ── Helpers ──────────────────────────────────────
function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// ── Mock inicial (substituir por fetch real) ──────
const MOCK_SERVICOS = [
  { id: 1, name: "Corte Tradicional", price: 45, description: "Corte clássico com acabamento perfeito", durationMin: 30 },
  { id: 2, name: "Corte + Barba",     price: 70, description: "Combo completo com toalha quente",        durationMin: 50 },
  { id: 3, name: "Barba Completa",    price: 35, description: "Modelagem e hidratação da barba",         durationMin: 30 },
];

const MOCK_BARBEIROS = [
  { id: 1, nome: "Rafael Mendes",  especialidade: "Degradê & Navalhado",     experiencia: "8 anos", foto: null },
  { id: 2, nome: "Lucas Carvalho", especialidade: "Barba & Corte Clássico",  experiencia: "5 anos", foto: null },
  { id: 3, nome: "Diego Santos",   especialidade: "Cabelo Crespo & Tranças", experiencia: "6 anos", foto: null },
];

const MOCK_HORARIOS = [
  { dia: "Segunda-feira", abertura: "09:00", fechamento: "19:00" },
  { dia: "Terça-feira",   abertura: "09:00", fechamento: "19:00" },
  { dia: "Quarta-feira",  abertura: "09:00", fechamento: "19:00" },
  { dia: "Quinta-feira",  abertura: "09:00", fechamento: "20:00" },
  { dia: "Sexta-feira",   abertura: "09:00", fechamento: "20:00" },
];

// ── Ícones SVG ────────────────────────────────────
const IconServicos   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
const IconBarbeiros  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconHorarios   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconEditar     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconDeletar    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IconFechar     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconMais       = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

// ════════════════════════════════════════════════
//  MODAIS
// ════════════════════════════════════════════════

function Modal({ titulo, onFechar, children }) {
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-titulo">{titulo}</h3>
          <button className="modal-fechar" onClick={onFechar}><IconFechar /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function ModalServico({ servico, onFechar, onSalvar }) {
  const [form, setForm] = useState(
    servico || { name: "", price: "", description: "", durationMin: "" }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(form);
    onFechar();
  }

  return (
    <Modal titulo={servico ? "Editar Serviço" : "Novo Serviço"} onFechar={onFechar}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nome</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ex: Corte Tradicional" required />
        </div>
        <div className="campos-linha">
          <div className="campo">
            <label>Preço (R$)</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0,00" required />
          </div>
          <div className="campo">
            <label>Duração (min)</label>
            <input name="durationMin" type="number" value={form.durationMin} onChange={handleChange} placeholder="30" required />
          </div>
        </div>
        <div className="campo">
          <label>Descrição</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descreva o serviço..." rows={3} required />
        </div>
        <div className="form-acoes">
          <button type="button" className="btn-cancelar" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn-salvar">Salvar</button>
        </div>
      </form>
    </Modal>
  );
}

function ModalBarbeiro({ barbeiro, onFechar, onSalvar }) {
  const [form, setForm] = useState(
    barbeiro || { nome: "", especialidade: "", experiencia: "", foto: null }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(form);
    onFechar();
  }

  return (
    <Modal titulo={barbeiro ? "Editar Barbeiro" : "Novo Barbeiro"} onFechar={onFechar}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nome completo</label>
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Rafael Mendes" required />
        </div>
        <div className="campo">
          <label>Especialidade</label>
          <input name="especialidade" value={form.especialidade} onChange={handleChange} placeholder="Ex: Degradê & Navalhado" required />
        </div>
        <div className="campo">
          <label>Experiência</label>
          <input name="experiencia" value={form.experiencia} onChange={handleChange} placeholder="Ex: 5 anos" required />
        </div>
        <div className="form-acoes">
          <button type="button" className="btn-cancelar" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn-salvar">Salvar</button>
        </div>
      </form>
    </Modal>
  );
}

function ModalHorario({ horario, onFechar, onSalvar }) {
  const [form, setForm] = useState(horario);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(form);
    onFechar();
  }

  return (
    <Modal titulo={`Horário — ${horario.dia}`} onFechar={onFechar}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="campos-linha">
          <div className="campo">
            <label>Abertura</label>
            <input name="abertura" type="time" value={form.abertura} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label>Fechamento</label>
            <input name="fechamento" type="time" value={form.fechamento} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-acoes">
          <button type="button" className="btn-cancelar" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn-salvar">Salvar</button>
        </div>
      </form>
    </Modal>
  );
}

// ════════════════════════════════════════════════
//  SEÇÕES
// ════════════════════════════════════════════════

function SecaoServicos() {
  const [servicos, setServicos]       = useState(MOCK_SERVICOS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando]       = useState(null);

  function abrirNovo()         { setEditando(null); setModalAberto(true); }
  function abrirEdicao(s)      { setEditando(s);    setModalAberto(true); }
  function fecharModal()       { setModalAberto(false); setEditando(null); }

  function salvar(form) {
    if (editando) {
      setServicos(servicos.map(s => s.id === editando.id ? { ...editando, ...form } : s));
    } else {
      setServicos([...servicos, { ...form, id: Date.now() }]);
    }
  }

  function deletar(id) {
    setServicos(servicos.filter(s => s.id !== id));
  }

  return (
    <div className="secao-admin">
      <div className="secao-admin-header">
        <div>
          <h2 className="secao-admin-titulo">Serviços</h2>
          <p className="secao-admin-sub">{servicos.length} serviços cadastrados</p>
        </div>
        <button className="btn-novo" onClick={abrirNovo}>
          <IconMais /> Novo Serviço
        </button>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Duração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map(s => (
              <tr key={s.id}>
                <td className="td-nome">{capitalizar(s.name)}</td>
                <td className="td-desc">{capitalizar(s.description)}</td>
                <td className="td-badge">
                  <span className="badge-dourado">
                    {Number(s.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </td>
                <td>{s.durationMin} min</td>
                <td>
                  <div className="acoes">
                    <button className="btn-acao btn-editar" onClick={() => abrirEdicao(s)}><IconEditar /></button>
                    <button className="btn-acao btn-deletar" onClick={() => deletar(s.id)}><IconDeletar /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <ModalServico servico={editando} onFechar={fecharModal} onSalvar={salvar} />
      )}
    </div>
  );
}

function SecaoBarbeiros() {
  const [barbeiros, setBarbeiros]     = useState(MOCK_BARBEIROS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando]       = useState(null);

  function abrirNovo()         { setEditando(null); setModalAberto(true); }
  function abrirEdicao(b)      { setEditando(b);    setModalAberto(true); }
  function fecharModal()       { setModalAberto(false); setEditando(null); }

  function salvar(form) {
    if (editando) {
      setBarbeiros(barbeiros.map(b => b.id === editando.id ? { ...editando, ...form } : b));
    } else {
      setBarbeiros([...barbeiros, { ...form, id: Date.now() }]);
    }
  }

  function deletar(id) {
    setBarbeiros(barbeiros.filter(b => b.id !== id));
  }

  return (
    <div className="secao-admin">
      <div className="secao-admin-header">
        <div>
          <h2 className="secao-admin-titulo">Barbeiros</h2>
          <p className="secao-admin-sub">{barbeiros.length} barbeiros cadastrados</p>
        </div>
        <button className="btn-novo" onClick={abrirNovo}>
          <IconMais /> Novo Barbeiro
        </button>
      </div>

      <div className="barbeiros-cards">
        {barbeiros.map((b, i) => (
          <div className="barbeiro-admin-card" key={b.id} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="barbeiro-admin-avatar">
              {b.foto
                ? <img src={b.foto} alt={b.nome} />
                : <span>{b.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
              }
            </div>
            <div className="barbeiro-admin-info">
              <strong>{capitalizar(b.nome)}</strong>
              <span>{b.especialidade}</span>
              <small>{b.experiencia} de experiência</small>
            </div>
            <div className="acoes acoes-col">
              <button className="btn-acao btn-editar" onClick={() => abrirEdicao(b)}><IconEditar /></button>
              <button className="btn-acao btn-deletar" onClick={() => deletar(b.id)}><IconDeletar /></button>
            </div>
          </div>
        ))}
      </div>

      {modalAberto && (
        <ModalBarbeiro barbeiro={editando} onFechar={fecharModal} onSalvar={salvar} />
      )}
    </div>
  );
}

function SecaoHorarios() {
  const [horarios, setHorarios]       = useState(MOCK_HORARIOS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando]       = useState(null);

  function abrirEdicao(h) { setEditando(h); setModalAberto(true); }
  function fecharModal()  { setModalAberto(false); setEditando(null); }

  function salvar(form) {
    setHorarios(horarios.map(h => h.dia === editando.dia ? { ...h, ...form } : h));
  }

  return (
    <div className="secao-admin">
      <div className="secao-admin-header">
        <div>
          <h2 className="secao-admin-titulo">Horários</h2>
          <p className="secao-admin-sub">Funcionamento de segunda a sexta</p>
        </div>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Abertura</th>
              <th>Fechamento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map(h => (
              <tr key={h.dia}>
                <td className="td-nome">{h.dia}</td>
                <td><span className="badge-hora">{h.abertura}</span></td>
                <td><span className="badge-hora">{h.fechamento}</span></td>
                <td>
                  <div className="acoes">
                    <button className="btn-acao btn-editar" onClick={() => abrirEdicao(h)}><IconEditar /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && editando && (
        <ModalHorario horario={editando} onFechar={fecharModal} onSalvar={salvar} />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════

const MENU = [
  { id: "servicos",  label: "Serviços",  icone: <IconServicos /> },
  { id: "barbeiros", label: "Barbeiros", icone: <IconBarbeiros /> },
  { id: "horarios",  label: "Horários",  icone: <IconHorarios /> },
];

function AdminPage() {
  const [abaAtiva, setAbaAtiva] = useState("servicos");

  return (
    <div className="admin">

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-text">Barber<em>Admin</em></span>
        </div>
        <nav className="sidebar-nav">
          {MENU.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${abaAtiva === item.id ? "sidebar-item-ativo" : ""}`}
              onClick={() => setAbaAtiva(item.id)}
            >
              <span className="sidebar-icone">{item.icone}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span>Painel Admin</span>
        </div>
      </aside>

      {/* ── Conteúdo ── */}
      <main className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar-titulo">
            {MENU.find(m => m.id === abaAtiva)?.label}
          </h1>
        </header>

        <div className="admin-content">
          {abaAtiva === "servicos"  && <SecaoServicos />}
          {abaAtiva === "barbeiros" && <SecaoBarbeiros />}
          {abaAtiva === "horarios"  && <SecaoHorarios />}
        </div>
      </main>

    </div>
  );
}

export default AdminPage;