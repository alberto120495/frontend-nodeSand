import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../context/auth/authContext";

function Login() {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Layout pagina="Login">
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans text-gray-800 text-center my-4">
          Iniciar Sesion
        </h2>
        <div className="flex justify-center mt-5">
          <div className="max-w-lg w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Correo Electronico"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
              <input
                type="submit"
                value="Iniciar Sesion"
                className="bg-red-500 hover:bg-gray-900 text-white w-full p-2 font-medium transition-colors duration-200 ease-in-out cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
