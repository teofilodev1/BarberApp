import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { showAlert } from  "../../components/ui/alert";
import "./home.css";

// Formata texto descrição
function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Formata texto especialidades
function formatarEspecialidades(texto) {
  return texto
    .split(",")
    .map(item => item.trim())
    .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(", ");
}

function HomePage() {
  const hoje = new Date().toLocaleDateString("pt-BR", { weekday: "long" });
  const diaAtual = hoje.charAt(0).toUpperCase() + hoje.slice(1);
  
  const [servicos, setServicos] = useState([]);
  useEffect(() => {
  async function carregarServicos() {
    try {
      const response = await fetch('http://localhost:3000/api/services');
      const data = await response.json();

      const formatados = data.map((s) => ({
        ...s,
        name: capitalizar(s.name),
        description: capitalizar(s.description),
        price: Number(s.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        durationMin: `${s.durationMin} min`,
      }));

      setServicos(formatados);
    } catch (error) {
      console.error('Erro ao carregar serviços', error);
      showAlert('Erro ao carregar serviços');
    }
  }
  carregarServicos();
}, []);

const [barbeiros, setBarbeiros] = useState([]);

useEffect(() => {
  async function carregarBarbeiros() {
    try {
      const response = await fetch('http://localhost:3000/api/barbeiros');
      const data = await response.json();

      const formatados = data.map((b) => ({
        ...b,
        nome: (b.nome),
        especialidade: formatarEspecialidades(b.especialidade),
      }));

      setBarbeiros(formatados); 
    } catch (error) {
      console.error('Erro ao carregar barbeiros', error);
      showAlert('Erro ao carregar barbeiros');
    }
  }
  carregarBarbeiros(); 
}, []);

const [horarios, setHorarios] = useState([]);
const ordem = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];
useEffect(() => {
  async function carregarHorarios() {
    try {
      const response = await fetch('http://localhost:3000/api/horarios');
      const data = await response.json();

      const formatados = data
        .map((h) => ({
          ...h,
          dia: capitalizar(h.diaSemana),
        }))
        .sort((a, b) => ordem.indexOf(a.diaSemana) - ordem.indexOf(b.diaSemana));

      setHorarios(formatados);
    } catch (error) {
      console.error('Erro ao carregar horarios', error);
      showAlert('Erro ao carregar horarios');
    }
  }
  carregarHorarios();
}, []);

  return (
    <Layout>
      <div className="home">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="grid-lines" />
          </div>
          <div className="hero-content">
            <span className="eyebrow">Barbearia Premium</span>
            <h1 className="titulo">
              Arte &amp; Precisão<br />
              <em>em cada corte</em>
            </h1>
            <p className="subtitulo">
              Onde estilo encontra tradição. Experimente o cuidado que você merece.
            </p>
            <div className="hero-botoes">
              <button className="btn btn-dourado">Agendar agora</button>
              <button className="btn btn-ghost">Ver serviços</button>
            </div>
          </div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section className="secao" id="servicos">
          <div className="secao-topo">
            <span className="tag">O que oferecemos</span>
            <h2 className="secao-titulo">Serviços</h2>
          </div>
          <div className="servicos-grid">
            {servicos.map((s, i) => (
              <div
                className="servico-card"
                key={s.id}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="servico-topo">
                  <span className="servico-nome">{s.name}</span>
                  <span className="servico-preco">{s.price}</span>
                </div>
                <p className="servico-desc">{s.description}</p>
                <div className="servico-rodape">
                  <span className="servico-duracao">⏱ {s.durationMin}</span>
                  <button className="servico-btn">Agendar</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BARBEIROS ── */}
        <section className="secao secao-escura" id="barbeiros">
          <div className="secao-topo">
            <span className="tag">Nossa equipe</span>
            <h2 className="secao-titulo">Barbeiros</h2>
          </div>
          <div className="barbeiros-grid">
            {barbeiros.map((b, i) => (
              <div
                className="barbeiro-card"
                key={b.id}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="barbeiro-avatar">
                  {b.foto
                    ? <img src={b.foto} alt={b.nome} className="barbeiro-foto" />
                    : <span className="barbeiro-iniciais">
                        {b.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                  }
                </div>
                <div className="barbeiro-info">
                  <h3 className="barbeiro-nome">{b.nome}</h3>
                  <p className="barbeiro-especialidade">{b.especialidade}</p>
                  <span className="barbeiro-experiencia">{b.experiencia} de experiência</span>
                </div>
                <button className="barbeiro-btn">
                  Agendar com {b.nome.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── HORÁRIOS ── */}
        <section className="secao" id="horarios">
          <div className="secao-topo">
            <span className="tag">Quando nos encontrar</span>
            <h2 className="secao-titulo">Horário de Funcionamento</h2>
          </div>
          <div className="horarios-wrapper">
            <ul className="horarios-lista">
              {horarios.map((h) => {
                const isHoje = diaAtual.toLowerCase() === h.dia.toLowerCase();
                return (
                  <li
                    key={h.dia}
                    className={`horario-item ${isHoje ? "horario-hoje" : ""}`}
                  >
                    <span className="horario-dia">
                      {isHoje && <span className="horario-ponto" aria-hidden="true" />}
                      {h.dia}
                    </span>
                    <span className="horario-horas">
                      {h.abertura} – {h.fechamento}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="horarios-cta">
              <p className="horarios-cta-texto">Pronto para um novo visual?</p>
              <button className="btn btn-dourado">Agendar horário</button>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export default HomePage;