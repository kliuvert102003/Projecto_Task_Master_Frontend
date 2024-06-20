import { useEffect, useState } from "react";
import Contexto from "./Context";

const Provider = ({ children }) => {
  const [Usuario, setUsuario] = useState([]);
  const [Carpetas, setCarpetas] = useState([]);
  const [Tareas, setTareas] = useState([]);
  const [Filter, setFilter] = useState([]);

  const mantenerUsuario = () => {
    const usuarioLocalS = localStorage.getItem("usuario");
    if (usuarioLocalS) {
      const user = JSON.parse(usuarioLocalS);
      setUsuario(user);
    }

    const CarpetasLocalS = localStorage.getItem("carpetas");
    if (CarpetasLocalS) {
      const folders = JSON.parse(CarpetasLocalS);
      setCarpetas(folders);
    }

    const tareasLocalS = localStorage.getItem("tareas");
    if (tareasLocalS) {
      const tasks = JSON.parse(tareasLocalS);
      setTareas(tasks);
    }

    const filtrarLocalS = localStorage.getItem("filtrarTareas");
    if (filtrarLocalS) {
      const tasks = JSON.parse(filtrarLocalS);
      setFilter(tasks);
    }
  };

  useEffect(() => {
    mantenerUsuario();
  }, []);

  return (
    <Contexto.Provider
      value={{
        Usuario,
        setUsuario,
        Carpetas,
        setCarpetas,
        Tareas,
        setTareas,
        Filter,
        setFilter,
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export default Provider;
