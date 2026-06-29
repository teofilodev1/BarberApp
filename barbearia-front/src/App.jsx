// src/App.jsx
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Layout from "./components/layout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter basename="/BarberApp">
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;