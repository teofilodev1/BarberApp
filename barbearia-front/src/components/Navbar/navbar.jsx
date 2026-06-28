import { useState } from "react";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "#servicos" },
  { label: "Barbeiros", href: "#barbeiros" },
  { label: "Horários", href: "#horarios" },
  { label: "Blog", href: "/blog", disabled: true },
];

export default function Navbar() {
  const [active, setActive] = useState("Início");
  const [open, setOpen] = useState(false);

  return (
<nav style={{
  width: "100%",
  display: "flex",
}}>
      {/* CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {/* LOGO */}
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              background: "#AFA9EC",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 2 L4 14 M4 7 L10 4 M10 4 L10 10 M10 10 L4 7"
                stroke="#26215C"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "serif",
              fontSize: 20,
              color: "#EEEDFE",
            }}
          >
            BarberApp
          </span>
        </a>

        {/* MENU DESKTOP */}
        <ul
          className="navLinks"
          style={{
            display: "flex",
            gap: 4,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map(({ label, href, disabled }) => (
            <li key={label}>
              <a
                href={disabled ? undefined : href}
                onClick={() => !disabled && setActive(label)}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: disabled
                    ? "rgba(174,169,236,0.35)"
                    : active === label
                    ? "#EEEDFE"
                    : "#AFA9EC",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 6,
                  display: "block",
                  background:
                    active === label
                      ? "rgba(174,169,236,0.18)"
                      : "transparent",
                  pointerEvents: disabled ? "none" : "auto",
                  transition: "0.2s",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA DESKTOP */}
        <button
          className="ctaBtn"
          style={{
            background: "#AFA9EC",
            color: "#26215C",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Agendar agora
        </button>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="menuBtn"
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "#EEEDFE",
            fontSize: 26,
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div
          className="mobileMenu"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#2f2a70",
            padding: 12,
            gap: 6,
          }}
        >
          {navLinks.map(({ label, href, disabled }) => (
            <a
              key={label}
              href={disabled ? undefined : href}
              onClick={() => {
                if (!disabled) {
                  setActive(label);
                  setOpen(false);
                }
              }}
              style={{
                color: disabled ? "#666" : "#EEEDFE",
                textDecoration: "none",
                padding: "10px",
                borderRadius: 6,
                background:
                  active === label
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                pointerEvents: disabled ? "none" : "auto",
              }}
            >
              {label}
            </a>
          ))}

          {/* CTA MOBILE */}
          <button
            style={{
              marginTop: 8,
              background: "#AFA9EC",
              color: "#26215C",
              border: "none",
              borderRadius: 6,
              padding: "10px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Agendar agora
          </button>
        </div>
      )}

      {/* RESPONSIVIDADE */}
      <style>{`
        @media (max-width: 768px) {
          .navLinks {
            display: none !important;
          }

          .ctaBtn {
            display: none !important;
          }

          .menuBtn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}