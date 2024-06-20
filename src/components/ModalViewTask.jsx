import { useContext, useEffect } from "react";
import { SvgDeletet } from "./SVG";
import { useForm } from "react-hook-form";
import Contexto from "../context/Context";

const ModalViewTask = ({
  closeModal,
  tarea,
  textBtn,
  funcion,
  carpeta,
  actualizar,
  usuario,
}) => {
  const { Carpetas } = useContext(Contexto);
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    setValue("title", tarea.title);
    setValue("description", tarea.description);
    setValue("status", tarea.status);
    setValue("due_date", tarea.due_date);
    setValue("priority", tarea.priority);
    setValue("email", tarea.email);
  }, [
    tarea.title,
    tarea.description,
    tarea.status,
    tarea.due_date,
    tarea.priority,
    tarea.email,
  ]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 w-full ">
        <form
          onSubmit={handleSubmit(funcion)}
          className="relative flex px-4  items-center mb-2 p-3  border border-[#242424] rounded-lg shadow-lg backdrop-blur-sm bg-white w-96 flex-col  py-6"
        >
          <input
            type="text"
            className="w-full rounded-lg  text-xl  focus:outline-none bg-transparent font-bold "
            placeholder="Título"
            {...register("title")}
          />
          {actualizar && (
            <div>
              <textarea
                className="w-full rounded-lg text-sm text-gray-600  focus:outline-none  font-bold bg-gray-300 resize-none h-36 p-3 mt-2"
                {...register("description")}
                placeholder="Descripción"
              />
              <input
                type="date"
                className="w-full rounded-lg  text-sm text-gray-600  focus:outline-none bg-transparent font-bold p-2 bg-yellow-200 my-2"
                {...register("due_date")}
                placeholder="Fecha de vencimiento"
              />
            </div>
          )}
          {actualizar && (
            <div className="w-full flex justify-start items-center gap-2 pt-2">
              <label
                htmlFor="medio"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">medio</p>

                <input
                  type="radio"
                  name="priority"
                  value={"medio"}
                  id="medio"
                  className="sr-only"
                  {...register("priority")}
                />
              </label>
              <label
                htmlFor="alto"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">alto</p>

                <input
                  type="radio"
                  name="priority"
                  value={"alto"}
                  id="alto"
                  className="sr-only"
                  {...register("priority")}
                />
              </label>
              <label
                htmlFor="urgente"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">urgente</p>

                <input
                  type="radio"
                  name="priority"
                  value={"urgente"}
                  id="urgente"
                  className="sr-only"
                  {...register("priority")}
                />
              </label>
            </div>
          )}

          {actualizar && (
            <div className="w-full flex justify-start items-center gap-2 pt-2">
              <label
                htmlFor="pendiente"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">pendiente</p>

                <input
                  type="radio"
                  name="priority"
                  value={"pendiente"}
                  id="pendiente"
                  className="sr-only"
                  {...register("status")}
                />
              </label>
              <label
                htmlFor="en progreso"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">en progreso</p>

                <input
                  type="radio"
                  name="priority"
                  value={"en progreso"}
                  id="en progreso"
                  className="sr-only"
                  {...register("status")}
                />
              </label>
              <label
                htmlFor="hecho"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">hecho</p>

                <input
                  type="radio"
                  name="priority"
                  value={"hecho"}
                  id="hecho"
                  className="sr-only"
                  {...register("status")}
                />
              </label>
            </div>
          )}
          {carpeta && (
            <div className="w-full flex justify-start items-center gap-2 pt-2">
              <select {...register("folder")} name="folder" id="folder">
                {Carpetas.map((carpeta) => (
                  <option key={carpeta.id} value={carpeta.id}>
                    {carpeta.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {usuario && (
            <div className="w-full flex flex-col justify-start items-center gap-2 pt-2">
              <input
                type="text"
                className="w-full rounded-lg  text-xl  focus:outline-none bg-transparent font-bold "
                placeholder="Email"
                {...register("email")}
              />
              <input
                type="password"
                className="w-full rounded-lg  text-xl  focus:outline-none bg-transparent font-bold placeholder:text-sm"
                placeholder="password"
                {...register("password")}
              />
            </div>
          )}
          <button className="w-full text-start font-bold text-blue-500 mt-2 hover:underline">
            {textBtn}
          </button>
          <span
            className="absolute top-1 right-1  font-semibold text-sm cursor-pointer "
            onClick={() => closeModal(false)}
          >
            <SvgDeletet />
          </span>
        </form>
      </div>
    </>
  );
};

export default ModalViewTask;
