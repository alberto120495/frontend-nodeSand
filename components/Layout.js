import Head from "next/head";
import Header from "./Header";
function Layout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>NodeSend - {pagina}</title>
        <meta name="description" content="Sitio Web para compartir archivos" />
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <Header />
          <main className="mt-2">{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
