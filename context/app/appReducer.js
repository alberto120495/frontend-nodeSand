import { types } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case types.MOSTRAR_MENSAJE:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };
    case types.LIMPIAR_MENSAJE:
      return {
        ...state,
        mensaje_archivo: null,
      };
    case types.SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: null,
      };

    case types.SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        mensaje_archivo: action.payload,
        cargando: null,
      };

    case types.CARGANDO:
      return {
        ...state,
        cargando: true,
      };

    case types.CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };

    default:
      state;
  }
};
