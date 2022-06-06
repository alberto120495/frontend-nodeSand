import { types } from "../../types";

export default function Reducer(state, action) {
  switch (action.type) {
    case types.REGISTRO_EXISTOSO:
    case types.REGISTRO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case types.LIMPIAR_MENSAJE:
      return {
        ...state,
        mensaje: null,
      };

    default:
      return state;
  }
}
