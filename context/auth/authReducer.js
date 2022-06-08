import { types } from "../../types";

export default function Reducer(state, action) {
  switch (action.type) {
    case types.REGISTRO_EXISTOSO:
    case types.REGISTRO_ERROR:
    case types.LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case types.LIMPIAR_MENSAJE:
      return {
        ...state,
        mensaje: null,
      };
    case types.LOGIN_EXITO:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };

    case types.USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      };
    case types.CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      };

    default:
      return state;
  }
}
