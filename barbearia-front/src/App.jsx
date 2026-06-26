import AppRoutes from './routes'
import Layout from "./components/layout";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function App() {
  return (
    <Container>
      <Layout />
      <AppRoutes />
    </Container>
  );
}

export default App;
