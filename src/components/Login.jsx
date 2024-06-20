import { useContext } from "react";

import Contexto from "../context/Context";
import { useNavigate } from "react-router-dom";
import FormUSer from "./FormUSer";

const Login = () => {
  const { setUsuario, setCarpetas, setTareas, setFilter } =
    useContext(Contexto);

  const nanvigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    const user = {
      email: email,
      password: password,
    };
    fetch("http://localhost:3100/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          return alert(res.msg);
        }
        return res.json();
      })
      .then((data) => {
        const id = data.user.id;
        setUsuario(data);
        window.localStorage.setItem("loguinUser", true);
        window.localStorage.setItem("usuario", JSON.stringify(data));
        fetch(`http://localhost:3100/folders/get-folders/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setCarpetas(data);
            window.localStorage.setItem("carpetas", JSON.stringify(data));
          })
          .then(() => {
            fetch(`http://localhost:3100/tasks/consult-tasks/${id}`)
              .then((res) => res.json())
              .then((data) => {
                setTareas(data);
                setFilter(data);
                window.localStorage.setItem("tareas", JSON.stringify(data));
                window.localStorage.setItem(
                  "filtrarTareas",
                  JSON.stringify(data)
                );
                nanvigate("/home/allTasks");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FormUSer
        funcion={onSubmit}
        btnSend="Entrar"
        title="Inicio de sesión"
        link1="Crear una cuenta"
        link2="Recuperar contraseña"
        descripcion="No tienes cuenta?"
        login={true}
      />
    </>
  );
};

export default Login;
