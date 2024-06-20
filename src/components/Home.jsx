import { useContext, useState } from "react";
import CardTodo from "./CardTodo";
import Header from "./Header";
import Contexto from "../context/Context";
import ModalViewTask from "./ModalViewTask";
import { SVGCreate, SVGFolder } from "./SVG";

const Home = () => {
  const {
    Usuario,
    Tareas,
    Carpetas,
    Filter,
    setTareas,
    setFilter,
    setCarpetas,
  } = useContext(Contexto);
  const [OpenModal, setOpenModal] = useState(false);
  const [InfoModal, setInfoModal] = useState();
  const [ModalCrearTarea, setModalCrearTarea] = useState(false);
  const [ModalCrearCarpeta, setModalCrearCarpeta] = useState(false);

  const handleFilter = (carpeta) => {
    const filtro = Tareas.filter((tarea) => tarea.id_folders === carpeta.id);
    setFilter(filtro);
  };

  const handleOpenModal = (carpeta) => {
    setOpenModal(true);
    setInfoModal(carpeta);
  };

  const pendientes = Filter.filter((tarea) => tarea.status === "pendiente");
  const enCurso = Filter.filter((tarea) => tarea.status === "en progreso");
  const hechos = Filter.filter((tarea) => tarea.status === "hecho");

  if (!Usuario) {
    return <h1>Cargando...</h1>;
  }

  const idUser =
    Usuario && Usuario.user && Usuario.user.id ? Usuario.user.id : "";
  //CRUD TAREAS
  const handleSubmitData = (data) => {
    fetch("http://localhost:3100/tasks/update-task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: InfoModal.id,
        id_user: idUser,
        id_folders: InfoModal.id_folders,
        title: data.title,
        description: data.description,
        status: data.status,
        due_date: data.due_date,
        priority: data.priority,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:3100/folders/get-folders/${idUser}`)
          .then((res) => res.json())
          .then((data) => {
            setCarpetas(data);
            window.localStorage.setItem("carpetas", JSON.stringify(data));
          })
          .then(() => {
            fetch(`http://localhost:3100/tasks/consult-tasks/${idUser}`)
              .then((res) => res.json())
              .then((data) => {
                setTareas(data);
                setFilter(data);
                window.localStorage.setItem("tareas", JSON.stringify(data));
                window.localStorage.setItem(
                  "filtrarTareas",
                  JSON.stringify(data)
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setOpenModal(false);
          });
      });
  };

  const crearTarea = (data) => {
    console.log(data);
    fetch("http://localhost:3100/tasks/save-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_user: idUser,
        id_folders: data.folder,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        due_date: data.due_date,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:3100/folders/get-folders/${idUser}`)
          .then((res) => res.json())
          .then((data) => {
            setCarpetas(data);
            window.localStorage.setItem("carpetas", JSON.stringify(data));
          })
          .then(() => {
            fetch(`http://localhost:3100/tasks/consult-tasks/${idUser}`)
              .then((res) => res.json())
              .then((data) => {
                setTareas(data);
                setFilter(data);
                window.localStorage.setItem("tareas", JSON.stringify(data));
                window.localStorage.setItem(
                  "filtrarTareas",
                  JSON.stringify(data)
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setModalCrearTarea(false);
          });
      });
  };

  const EliminarTarea = (id) => {
    fetch(`http://localhost:3100/tasks/delete-task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:3100/folders/get-folders/${idUser}`)
          .then((res) => res.json())
          .then((data) => {
            setCarpetas(data);
            window.localStorage.setItem("carpetas", JSON.stringify(data));
          })
          .then(() => {
            fetch(`http://localhost:3100/tasks/consult-tasks/${idUser}`)
              .then((res) => res.json())
              .then((data) => {
                setTareas(data);
                setFilter(data);
                window.localStorage.setItem("tareas", JSON.stringify(data));
                window.localStorage.setItem(
                  "filtrarTareas",
                  JSON.stringify(data)
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
  };

  // CARPETAS
  const crearCarpeta = (data) => {
    const carpeta = {
      id: idUser,
      name: data.title,
    };
    fetch("http://localhost:3100/folders/save-folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carpeta),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:3100/folders/get-folders/${idUser}`)
          .then((res) => res.json())
          .then((data) => {
            setCarpetas(data);
            window.localStorage.setItem("carpetas", JSON.stringify(data));
          })
          .then(() => {
            fetch(`http://localhost:3100/tasks/consult-tasks/${idUser}`)
              .then((res) => res.json())
              .then((data) => {
                setTareas(data);
                setFilter(data);
                window.localStorage.setItem("tareas", JSON.stringify(data));
                window.localStorage.setItem(
                  "filtrarTareas",
                  JSON.stringify(data)
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setModalCrearCarpeta(false);
          });
      });
    console.log(carpeta);
  };

  return (
    <>
      <section className="w-full h-screen  mb-2">
        <Header />
        <div className="w-full h-10 mb-1 mx-auto max-w-screen-xl flex gap-1 items-start justify-between">
          <div className=" flex">
            <div
              onClick={() => setFilter(Tareas)}
              className=" flex justify-start items-center cursor-pointer gap-1 hover:bg-gray-100 px-2 py-1 rounded-md"
            >
              <SVGFolder />
              <h1 className="font-bold text-gray-500">Todo</h1>
            </div>
            {Carpetas.map((carpeta) => (
              <div
                onClick={() => handleFilter(carpeta)}
                key={carpeta.id}
                className=" flex justify-start items-center cursor-pointer gap-1 hover:bg-gray-100 px-2 py-1 rounded-md"
              >
                <SVGFolder />
                <h1 className="font-bold text-gray-500">{carpeta.name}</h1>
              </div>
            ))}
          </div>

          <div className="flex">
            <div
              onClick={() => setModalCrearCarpeta(true)}
              className=" flex justify-start items-center cursor-pointer gap-1 hover:bg-gray-100 px-2 py-1 rounded-md"
            >
              <SVGCreate />
              <h1 className="font-bold text-gray-500">Crear carpeta</h1>
            </div>
            <div
              onClick={() => setModalCrearTarea(true)}
              className=" flex justify-start items-center cursor-pointer gap-1 hover:bg-gray-100 px-2 py-1 rounded-md"
            >
              <SVGCreate />
              <h1 className="font-bold text-gray-500">Crear tarea</h1>
            </div>
          </div>
        </div>
        <section className="w-full py-5 flex  flex-wrap mx-auto max-w-screen-xl  sm:px-6  justify-between border-2 rounded-lg ">
          <div className="w-[30%] flex justify-start items-center  flex-col gap-2 ">
            <h1 className="font-bold text-blue-500">Pendiente</h1>
            {pendientes.map((tarea) => (
              <CardTodo
                key={tarea.id}
                title={tarea.title}
                estado={tarea.status}
                descripcion={tarea.description}
                prioridad={tarea.priority}
                fecha={tarea.due_date}
                openModal={() => handleOpenModal(tarea)}
                EliminarTarea={() => EliminarTarea(tarea.id)}
              />
            ))}
          </div>
          <div className="w-[30%] flex justify-start border-r-2 items-center border-l-2 flex-col gap-2">
            <h1 className="font-bold text-yellow-500">En curso</h1>
            {enCurso.map((tarea) => (
              <CardTodo
                key={tarea.id}
                title={tarea.title}
                estado={tarea.status}
                descripcion={tarea.description}
                prioridad={tarea.priority}
                fecha={tarea.due_date}
                openModal={() => handleOpenModal(tarea)}
                EliminarTarea={() => EliminarTarea(tarea.id)}
              />
            ))}
          </div>
          <div className="w-[30%] flex justify-start items-center flex-col gap-2">
            <h1 className="font-bold text-green-500">Hecho</h1>
            {hechos.map((tarea) => (
              <CardTodo
                key={tarea.id}
                title={tarea.title}
                estado={tarea.status}
                descripcion={tarea.description}
                prioridad={tarea.priority}
                fecha={tarea.due_date}
                openModal={() => handleOpenModal(tarea)}
                EliminarTarea={() => EliminarTarea(tarea.id)}
              />
            ))}
          </div>
        </section>
      </section>
      {OpenModal && (
        <ModalViewTask
          closeModal={setOpenModal}
          tarea={InfoModal}
          textBtn="Guardar cambios"
          funcion={handleSubmitData}
          carpeta={false}
          actualizar={true}
        />
      )}

      {ModalCrearTarea && (
        <ModalViewTask
          closeModal={setModalCrearTarea}
          textBtn="Crear tarea"
          funcion={crearTarea}
          carpeta={true}
          actualizar={true}
          tarea={{}}
        />
      )}

      {ModalCrearCarpeta && (
        <ModalViewTask
          closeModal={setModalCrearCarpeta}
          tarea={{}}
          textBtn="Crear Carpeta"
          funcion={crearCarpeta}
          carpeta={false}
          actualizar={false}
          user
        />
      )}
    </>
  );
};

export default Home;
