import AppRoutes from './routes'
import Layout from "./components/layout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
