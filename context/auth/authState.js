import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { types } from "../../types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  const initalState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(authReducer, initalState);

  //Registrar usuario
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      dispatch({
        type: types.REGISTRO_EXISTOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: types.REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    } finally {
      setTimeout(() => {
        dispatch({
          type: types.LIMPIAR_MENSAJE,
        });
      }, 3000);
    }
  };

  //Autenticar Usuarios
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios/login", datos);
      dispatch({
        type: types.LOGIN_EXITO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: types.LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({
        type: types.LIMPIAR_MENSAJE,
      });
    }, 3000);
  };

  //Retornar Usuario en base al JWT
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios("/api/usuarios/login");
      if (respuesta.data.usuario) {
        dispatch({
          type: types.USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario,
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({
        type: types.LIMPIAR_MENSAJE,
      });
    }, 3000);
  };

  const cerrarSesion = () => {
    dispatch({
      type: types.CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
