import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Contexto from "../context/Context";
import ModalViewTask from "./ModalViewTask";

const Header = () => {
  const { Usuario, setFilter, Tareas, setUsuario } = useContext(Contexto);
  const [OpenModal, setOpenModal] = useState(false);
  const usuario =
    Usuario.user && Usuario.user.names && Usuario.user.email
      ? Usuario.user.names + " | " + Usuario.user.email
      : "Cargando...";

  const filterHeader = (prioridad) => {
    const filtro = Tareas.filter((tarea) => tarea.priority === prioridad);
    setFilter(filtro);
  };

  const handleSubmitData = (data) => {
    const user = {
      id: Usuario.user.id,
      names: data.title,
      email: data.email,
      password: data.password,
    };
    console.log(user);
    fetch("http://localhost:3100/users/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario({
          token: Usuario.token,
          user: data.user,
        });
        const userData = JSON.parse(localStorage.getItem("usuario"));
        userData.user = data.user;
        localStorage.setItem("usuario", JSON.stringify(userData));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpenModal(false);
      });
  };

  const CerrarSesion = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-white ">
        <div className="mx-auto max-w-screen-xl  pl-1 ">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <NavLink className="block text-teal-600">
                <span className="sr-only">Home</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </NavLink>
            </div>
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li className="text-blue-500 font-bold">
                    <p>Prioridad: </p>
                  </li>
                  <li>
                    <p
                      onClick={() => filterHeader("medio")}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold cursor-pointer"
                    >
                      {" "}
                      Medio{" "}
                    </p>
                  </li>

                  <li>
                    <p
                      onClick={() => filterHeader("alto")}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold cursor-pointer"
                    >
                      {" "}
                      Alto{" "}
                    </p>
                  </li>

                  <li>
                    <p
                      onClick={() => filterHeader("urgente")}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold cursor-pointer"
                    >
                      {" "}
                      Urgente{" "}
                    </p>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div
                onClick={() => setOpenModal(true)}
                className="sm:flex sm:gap-4"
              >
                <p className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 cursor-pointer flex gap-2">
                  {usuario}
                </p>
              </div>
              <p
                className="font-bold text-red-500 cursor-pointer"
                onClick={CerrarSesion}
              >
                cerrar sesión
              </p>
            </div>
          </div>
        </div>
      </header>
      {OpenModal && (
        <ModalViewTask
          closeModal={setOpenModal}
          textBtn="Actualizar Usuario"
          funcion={handleSubmitData}
          usuario={true}
          tarea={{
            title: Usuario.user.names,
            email: Usuario.user.email,
          }}
        />
      )}
    </>
  );
};

export default Header;
