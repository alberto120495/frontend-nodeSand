import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";
import Dropzone from "../components/Dropzone";
import Alerta from "../components/Alerta";

export default function Home() {
  const { usuarioAutenticado } = useContext(AuthContext);
  const { mensaje_archivo, url } = useContext(AppContext);

  const [copy, setCopy] = useState(false);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <>
      <Layout pagina="Inicio">
        <div className="md:w-4/5 xl:w-3/5 mx-auto ">
          {url ? (
            <div className="flex flex-col  items-center">
              <p className="text-center text-2xl">
                <span className="font-bold text-red-600 text-4xl uppercase block mb-2">
                  Tu URL es:
                </span>
                {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`}
              </p>
              {copy ? (
                <button
                  type="button"
                  className="bg-gray-900 text-white w-1/2  p-2 font-medium transition-colors duration-200 ease-in-out mt-10 cursor-copy"
                  disabled
                >
                  Enlace Copiado
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-gray-900 text-white w-1/2  p-2 font-medium transition-colors duration-200 ease-in-out cursor-pointer mt-10"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`
                    );
                    setCopy(true);
                  }}
                >
                  Copiar Enlace
                </button>
              )}
            </div>
          ) : (
            <>
              {mensaje_archivo && <Alerta />}
              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 ">
                <Dropzone />
                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                    Compartir archivos de forma sencilla y privada
                  </h2>
                  <p className="text-lg leading-loose">
                    <span className="text-red-500 font-bold">
                      ReactNodeSend
                    </span>{" "}
                    te permite compartir archivos con cifrado de extremo a
                    extremo y un archivo que es eliminado despues de ser
                    descargado. Asi que puedes mantener lo que compartes en
                    privado y asegurarte de que tus cosas no permanezcan en
                    linea para siempre.
                  </p>
                  <Link href="/crear-cuenta">
                    <a className="text-red-500 font-bold text-lg hover:text-red-700">
                      Crea una cuenta para mayores beneficios
                    </a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
