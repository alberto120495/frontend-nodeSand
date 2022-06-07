import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";
import AppContext from "../context/app/appContext";

function Dropzone() {
  const { mostrarAlerta, subirArchivo, cargando, crearEnlace } =
    useContext(AppContext);

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);
    subirArchivo(formData, acceptedFiles[0].path);
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    mostrarAlerta(
      "No se Pudo Subir, el limite es 1MB, obten una cuenta gratis para subir archivos mas grandes"
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      maxSize: 1000000,
    });

  const archivos = acceptedFiles.map((file) => (
    <li key={file.path} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{archivos}</ul>
          {cargando ? (
            <p className="my-10 text-center text-gray-600">
              Subiendo archivo...
            </p>
          ) : (
            <button
              type="button"
              className="bg-blue-600 w-full py-4 rounded-lg text-white my-10 hover:bg-blue-700"
              onClick={crearEnlace}
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="cursor-pointer text-2xl text-gray-600 text-center">
              Arrastra los archivos aqui...
            </p>
          ) : (
            <div className="text-center">
              <p className="cursor-pointer text-2xl text-gray-600">
                Arrastra y suelta algunos archivos aqui o haz click para
                seleccionar.
              </p>
              <button className="bg-blue-600 w-full py-4 rounded-lg text-white my-10 hover:bg-blue-700">
                Selecciona archivos para subir.
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropzone;
