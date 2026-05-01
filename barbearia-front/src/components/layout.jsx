// src/components/Layout/Layout.jsx
import Navbar from "./Navbar/navbar";

function Layout({ children }) {
  return (
    <div style={styles.page}>
      {/* Círculos decorativos do fundo */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <Navbar />

      {/* Aqui entra o conteúdo de cada página */}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  page: {
    background: "#0f0c1a",
    minHeight: "100vh",
    color: "#EEEDFE",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
  },
  bgCircle1: {
    position: "fixed",
    width: 700, height: 700,
    borderRadius: "50%",
    background: "#7F77DD",
    opacity: 0.05,
    top: -180, right: -150,
    zIndex: 0,
  },
  bgCircle2: {
    position: "fixed",
    width: 400, height: 400,
    borderRadius: "50%",
    background: "#7F77DD",
    opacity: 0.04,
    bottom: -100, left: -120,
    zIndex: 0,
  },
  main: {
    position: "relative",
    zIndex: 2, // fica na frente dos círculos
  },
};

export default Layout;