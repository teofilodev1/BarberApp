import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./home.css";
import Footer from "../../components/Footer/footer";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const hoje = new Date().toLocaleDateString("pt-BR", { weekday: "long" });
  const diaAtual = hoje.charAt(0).toUpperCase() + hoje.slice(1);
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resServicos, resBarbeiros, resHorarios] = await Promise.all([
          fetch(`${API_URL}/services`),
          fetch(`${API_URL}/barbeiros`),
          fetch(`${API_URL}/horarios`),
        ]);

        if (!resServicos.ok || !resBarbeiros.ok || !resHorarios.ok) {
          throw new Error("Erro ao buscar dados do servidor.");
        }

        const [dataServicos, dataBarbeiros, dataHorarios] = await Promise.all([
          resServicos.json(),
          resBarbeiros.json(),
          resHorarios.json(),
        ]);

        setServicos(dataServicos);
        setBarbeiros(dataBarbeiros);
        setHorarios(dataHorarios);
      } catch (err) {
        console.error(err);
        setErro("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  function handleAgendarServico(servico) {
    navigate('/login', { state: { servico } });
  }

  function handleAgendarComBarbeiro(barbeiro) {
    navigate('/login', { state: { barbeiro } });
  }

  function handleAgendar() {
    navigate('/login', { state: { servico: servicos[0] ?? null } });
  }

if (loading) {
  return (
    <div className="loading-wrap">
      <svg className="scissors" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="16" cy="20" r="7" stroke="#afa9ec" strokeWidth="2.5"/>
        <circle cx="16" cy="44" r="7" stroke="#afa9ec" strokeWidth="2.5"/>
        <circle cx="16" cy="20" r="3" fill="#7f77dd"/>
        <circle cx="16" cy="44" r="3" fill="#7f77dd"/>
        <line x1="21" y1="17" x2="56" y2="6" stroke="#afa9ec" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="21" y1="47" x2="56" y2="58" stroke="#afa9ec" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="21" y1="21" x2="56" y2="32" stroke="#7f77dd" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3"/>
        <line x1="21" y1="43" x2="56" y2="32" stroke="#7f77dd" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3"/>
      </svg>
      <div className="loading-text">
        Carregando<span className="loading-dots"><span>.</span><span>.</span><span>.</span></span>
      </div>
      <div className="loading-bar"><div className="loading-bar-fill" /></div>
    </div>
  );
}

if (erro) {
  return <div className="erro">{erro}</div>;
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
            <button className="btn btn-dourado" onClick={handleAgendar}>
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
          {servicos.length === 0 ? (
            <p>Nenhum serviço disponível no momento.</p>
          ) : (
            servicos.map((s, i) => (
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
            ))
          )}
        </div>
      </section>

      {/* ── BARBEIROS ── */}
      <section className="secao secao-escura" id="barbeiros">
        <div className="secao-topo">
          <span className="tag">Nossa equipe</span>
          <h2 className="secao-titulo">Barbeiros</h2>
        </div>
        <div className="barbeiros-grid">
          {barbeiros.length === 0 ? (
            <p>Nenhum barbeiro disponível no momento.</p>
          ) : (
            barbeiros.map((b, i) => (
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
            ))
          )}
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
            <button className="btn btn-dourado" onClick={handleAgendar}>
              Agendar horário
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;