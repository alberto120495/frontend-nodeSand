import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { types } from "../../types";
import clienteAxios from "../../config/axios";

const AuthState = ({ children }) => {
  const initalState = {
    token: "",
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

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
