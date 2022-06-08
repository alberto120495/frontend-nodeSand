import { useContext, useState } from "react";
import AppContext from "../context/app/appContext";
function Formulario() {
  const [checkPassword, setCheckPassword] = useState(false);

  const { agregarPassword, agregarDescargas } = useContext(AppContext);
  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras:</label>
        <select
          onChange={(e) => {
            agregarDescargas(parseInt(e.target.value));
          }}
          className="w-full mt-2  bg-white border border-gray-400  text-base text-black py-3 px-4 pr-8 rounded outline-none leading-none focus:border-gray-500"
        >
          <option value="" selected disabled>
            --Seleccione--
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center ">
          <label className="text-lg text-gray-800 mr-2" htmlFor="password">
            Proteger con Contraseña
          </label>
          <input
            id="password"
            type="checkbox"
            onChange={() => setCheckPassword(!checkPassword)}
          />
        </div>
        {checkPassword && (
          <input
            onChange={(e) => agregarPassword(e.target.value)}
            className="w-full mt-2  bg-white border border-gray-400  text-base text-black py-3 px-4 pr-8 rounded outline-none leading-none focus:border-gray-500"
            type="password"
            placeholder="Contraseña"
          />
        )}
      </div>
    </div>
  );
}

export default Formulario;
