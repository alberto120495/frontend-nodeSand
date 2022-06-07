import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AuthContext from "../context/auth/authContext";

function Header() {
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <Image
            src="/logo.svg"
            width={200}
            height={50}
            alt="logo"
            className="cursor-pointer"
          />
        </a>
      </Link>
      <div className="space-x-4">
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              onClick={cerrarSesion}
              type="button"
              className="bg-black px-5 py-3 rounded text-white font-bold"
            >
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded text-white font-bold">
                Iniciar Sesion
              </a>
            </Link>
            <Link href="/crear-cuenta">
              <a className="bg-black px-5 py-3 rounded text-white font-bold">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
