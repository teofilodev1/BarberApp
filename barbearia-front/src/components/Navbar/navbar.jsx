import { useState } from "react";

const navLinks = [
  { label: "Início",    href: "/" },
  { label: "Serviços",  href: "#servicos" },
  { label: "Barbeiros", href: "#barbeiros" },
  { label: "Horários",  href: "#horarios" },
  { label: "Blog",      href: "/blog", disabled: true },
];

export default function Navbar() {
  const [active, setActive] = useState("Início");

  return (
    <nav style={{
      background: "#3C3489",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>

      {/* Logo */}
      <a href="/" style={{ textDecoration: "none", display: "flex",
        alignItems: "center", gap: "10px" }}>
        <div style={{ width: 30, height: 30, background: "#AFA9EC",
          borderRadius: 6, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 2 L4 14 M4 7 L10 4 M10 4 L10 10 M10 10 L4 7"
              stroke="#26215C" strokeWidth="1.8" strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </div>
        <span style={{ fontFamily: "serif", fontSize: 22,
          color: "#EEEDFE", letterSpacing: "0.5px" }}>
          BarberApp
        </span>
      </a>

      {/* Links */}
      <ul style={{ display: "flex", gap: 4, listStyle: "none",
        margin: 0, padding: 0 }}>
        {navLinks.map(({ label, href, disabled }) => (
          <li key={label}>
            <a href={disabled ? undefined : href}
              onClick={() => !disabled && setActive(label)}
              style={{
                fontFamily: "sans-serif", fontSize: 14, fontWeight: 500,
                color: disabled ? "rgba(174,169,236,0.35)"
                  : active === label ? "#EEEDFE" : "#AFA9EC",
                textDecoration: "none", padding: "6px 14px",
                borderRadius: 6, display: "block",
                background: active === label
                  ? "rgba(174,169,236,0.18)" : "transparent",
                pointerEvents: disabled ? "none" : "auto",
                transition: "background 0.15s, color 0.15s",
              }}
            >{label}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button style={{
        background: "#AFA9EC", color: "#26215C", border: "none",
        borderRadius: 6, padding: "8px 18px", fontSize: 13,
        fontWeight: 500, cursor: "pointer",
      }}>
        Agendar agora
      </button>
    </nav>
  );
}