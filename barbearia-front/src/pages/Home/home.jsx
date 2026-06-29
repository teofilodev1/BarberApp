import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./home.css";
import Footer from "../../components/Footer/footer";

// Formata texto descrição (Comentado até o backend estar pronto para evitar erro de 'unused-vars')
/*
function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
*/

// Formata texto especialidades (Comentado até o backend estar pronto)
/*
function formatarEspecialidades(texto) {
  return texto
    .split(",")
    .map(item => item.trim())
    .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(", ");
}
*/

function HomePage() {
  const hoje = new Date().toLocaleDateString("pt-BR", { weekday: "long" });
  const diaAtual = hoje.charAt(0).toUpperCase() + hoje.slice(1);

  // 1. CORREÇÃO: O hook useNavigate deve ser chamado na raiz do componente!
  const navigate = useNavigate();

  // ─── DADOS ESTÁTICOS PARA APRESENTAÇÃO ───
  // TODO: Quando o backend estiver rodando, descomentar os useEffect e trocar useState([...]) por useState([])

  // 2. CORREÇÃO: Removidos os 'setServicos', 'setBarbeiros' etc., pois não estão sendo usados no momento
  const [servicos] = useState([
    {
      id: 1,
      name: "Corte Clássico",
      description: "Corte tradicional com acabamento perfeito e toalha quente",
      price: "R$ 45,00",
      durationMin: "30 min",
    },
    {
      id: 2,
      name: "Barba Completa",
      description: "Modelagem e aparação com navalha e toalha quente",
      price: "R$ 35,00",
      durationMin: "25 min",
    },
    {
      id: 3,
      name: "Corte + Barba",
      description: "Combo completo com corte e barba na navalha",
      price: "R$ 70,00",
      durationMin: "50 min",
    },
    {
      id: 4,
      name: "Degradê",
      description: "Degradê moderno com técnica de pente e máquina",
      price: "R$ 55,00",
      durationMin: "40 min",
    },
    {
      id: 5,
      name: "Pigmentação",
      description: "Pigmentação capilar para cobertura de falhas",
      price: "R$ 80,00",
      durationMin: "45 min",
    },
    {
      id: 6,
      name: "Hidratação",
      description: "Tratamento capilar com hidratação profunda",
      price: "R$ 40,00",
      durationMin: "30 min",
    },
  ]);

  const [barbeiros] = useState([
    {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Degradê, Corte clássico",
      experiencia: "8 anos",
      foto: null,
    },
    {
      id: 2,
      nome: "Rafael Oliveira",
      especialidade: "Barba, Pigmentação",
      experiencia: "5 anos",
      foto: null,
    },
    {
      id: 3,
      nome: "Lucas Mendes",
      especialidade: "Corte moderno, Hidratação",
      experiencia: "3 anos",
      foto: null,
    },
  ]);

  const [horarios] = useState([
    { dia: "Segunda-feira", diaSemana: "segunda-feira", abertura: "09:00", fechamento: "19:00" },
    { dia: "Terça-feira", diaSemana: "terça-feira", abertura: "09:00", fechamento: "19:00" },
    { dia: "Quarta-feira", diaSemana: "quarta-feira", abertura: "09:00", fechamento: "19:00" },
    { dia: "Quinta-feira", diaSemana: "quinta-feira", abertura: "09:00", fechamento: "19:00" },
    { dia: "Sexta-feira", diaSemana: "sexta-feira", abertura: "09:00", fechamento: "20:00" },
    { dia: "Sábado", diaSemana: "sábado", abertura: "08:00", fechamento: "17:00" },
    { dia: "Domingo", diaSemana: "domingo", abertura: "Fechado", fechamento: "" },
  ]);

  // Comentado para evitar erro de variável não usada
  /*
  const ordem = [
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "domingo",
  ];
  */

  function handleAgendarServico(servico) {
      // Aqui você pode implementar a lógica para agendar com o serviço selecionado
    // Por enquanto, vamos apenas redirecionar para a página de login com o barbeiro selecionado
    navigate('/login', { state: { servico: servico } });
  }

  function handleAgendarComBarbeiro(barbeiro) {
    // Aqui você pode implementar a lógica para agendar com o barbeiro selecionado
    // Por enquanto, vamos apenas redirecionar para a página de login com o barbeiro selecionado
    navigate('/login', { state: { barbeiro } });
  }

  function handleAgendar(servico) {
    // Aqui você pode implementar a lógica para agendar com o serviço selecionado
    // Por enquanto, vamos apenas redirecionar para a página de login com o serviço selecionado
    navigate('/login', { state: { servico } });
  }
  
  return (
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
            <button className="btn btn-dourado" onClick={() => handleAgendar(servicos[0])}>
              Agendar agora
            </button>
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
                <button className="servico-btn" onClick={() => handleAgendarServico(s)}>
                  Agendar
                </button>
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
              <button className="barbeiro-btn" onClick={() => handleAgendarComBarbeiro(b)}>
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
      <Footer />
    </div>
  );
}

export default HomePage;