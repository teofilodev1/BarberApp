// src/components/Layout/Layout.jsx

import styled, { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar/navbar";

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  html,
  body,
  #root {
    width:100%;
    overflow-x:hidden;
  }

  body {
    background:#0f0c1a;
  }
`;

const Page = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0f0c1a;

  color: #eeedfe;
  font-family: "DM Sans", sans-serif;
  overflow-x: hidden;
+ overflow-y: visible;
`;

const BgCircle = styled.div`
  position: absolute;
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
  width: 100%;
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