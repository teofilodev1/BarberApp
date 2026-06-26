// src/components/Layout/Layout.jsx
import styled, { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar/navbar";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --toastify-color-dark: #1e1a2e;
    --toastify-text-color-dark: #eeedfe;
    --toastify-color-progress-dark: #7f77dd;
    --toastify-color-success: #7f77dd;
    --toastify-color-error: #ff6b6b;
    --toastify-color-warning: #f0a500;
    --toastify-color-info: #7f77dd;
    --toastify-font-family: 'DM Sans', sans-serif;
    --toastify-border-radius: 10px;
    --toastify-z-index: 9999;
  }

  .Toastify__toast {
    border: 1px solid #7f77dd33;
  }
`;

const Page = styled.div`
  background: #0f0c1a;
  min-height: 100vh;
  color: #eeedfe;
  font-family: "DM Sans", sans-serif;
  position: relative;
`;

const BgCircle = styled.div`
  position: fixed;
  border-radius: 50%;
  background: #7f77dd;
  z-index: 0;
`;

const BgCircle1 = styled(BgCircle)`
  width: 700px;
  height: 700px;
  opacity: 0.05;
  top: -180px;
  right: -150px;
`;

const BgCircle2 = styled(BgCircle)`
  width: 400px;
  height: 400px;
  opacity: 0.04;
  bottom: -100px;
  left: -120px;
`;

const Main = styled.main`
  position: relative;
  z-index: 2;
`;

function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Page>
        <BgCircle1 />
        <BgCircle2 />
        <Navbar />
        <Main>{children}</Main>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </Page>
    </>
  );
}

export default Layout;