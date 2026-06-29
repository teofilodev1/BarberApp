import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "#servicos" },
  { label: "Barbeiros", href: "#barbeiros" },
  { label: "Horários", href: "#horarios" },
  { label: "Blog", href: "/blog", disabled: true },
];

function isRouteLink(href) {
  return href.startsWith("/");
}

export default function Navbar() {
  const [active, setActive] = useState("Início");
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ width: "100%", display: "flex", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "#AFA9EC", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2 L4 14 M4 7 L10 4 M10 4 L10 10 M10 10 L4 7" stroke="#26215C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "serif", fontSize: 20, color: "#EEEDFE" }}>BarberApp</span>
        </Link>

        <ul className="navLinks" style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map(({ label, href, disabled }) => {
            const linkStyle = { fontFamily: "sans-serif", fontSize: 14, fontWeight: 500, color: disabled ? "rgba(174,169,236,0.35)" : active === label ? "#EEEDFE" : "#AFA9EC", textDecoration: "none", padding: "6px 14px", borderRadius: 6, display: "block", background: active === label ? "rgba(174,169,236,0.18)" : "transparent", pointerEvents: disabled ? "none" : "auto", transition: "0.2s" };
            return (
              <li key={label}>
                {disabled ? <span style={linkStyle}>{label}</span> : isRouteLink(href) ? <Link to={href} onClick={() => setActive(label)} style={linkStyle}>{label}</Link> : <a href={href} onClick={() => setActive(label)} style={linkStyle}>{label}</a>}
              </li>
            );
          })}
        </ul>

        <button className="ctaBtn" style={{ background: "#AFA9EC", color: "#26215C", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Agendar agora</button>

        <button onClick={() => setOpen(!open)} className="menuBtn" style={{ display: "none", background: "transparent", border: "none", color: "#EEEDFE", fontSize: 26, cursor: "pointer" }}>☰</button>
      </div>

      {open && (
        <div style={{ position: "absolute", top: 64, left: 0, width: "100%", background: "#2f2a70", padding: 12, display: "flex", flexDirection: "column", gap: 6, zIndex: 1000 }}>
          {navLinks.map(({ label, href, disabled }) => {
            const mobileStyle = { color: disabled ? "#666" : "#EEEDFE", textDecoration: "none", padding: "10px", borderRadius: 6, background: active === label ? "rgba(255,255,255,0.1)" : "transparent" };
            return (
              <Link key={label} to={href} onClick={() => { setActive(label); setOpen(false); }} style={mobileStyle}>{label}</Link>
            );
          })}
        </div>
      )}

      <style>{`@media (max-width: 768px) { .navLinks, .ctaBtn { display: none !important; } .menuBtn { display: block !important; } }`}</style>
    </nav>
  );
}