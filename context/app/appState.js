import { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";
import { types } from "../../types";

function AppState({ children }) {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  //Muestra alerta

  const mostrarAlerta = (msg) => {
    console.log(msg);
    dispatch({
      type: types.MOSTRAR_MENSAJE,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: types.LIMPIAR_MENSAJE,
      });
    }, 3000);
  };

  //Subir archivos al servidor
  const subirArchivo = async (formData, nombreArchivo) => {
    dispatch({
      type: types.CARGANDO,
    });
    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);
      dispatch({
        type: types.SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: types.SUBIR_ARCHIVO_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };
    try {
      const resultado = await clienteAxios.post("/api/enlaces", data);
      dispatch({
        type: types.CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarState = () => {
    dispatch({
      type: types.LIMPIAR_STATE,
    });
  };

  const agregarPassword = (password) => {
    dispatch({
      type: types.AGREGAR_PASSWORD,
      payload: password,
    });
  };

  const agregarDescargas = (descargas) => {
    dispatch({
      type: types.AGREGAR_DESCARGAS,
      payload: descargas,
    });
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default AppState;
