import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import AuthContext from "../context/auth/authContext";
export default function Home() {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <>
      <Layout pagina="Inicio">
        <h1>Index</h1>
      </Layout>
    </>
  );
}
