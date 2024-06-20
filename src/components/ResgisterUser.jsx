import { useNavigate } from "react-router-dom";
import FormUSer from "./FormUSer";

const ResgisterUser = () => {
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:3100/users/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.msg);
        }
        return res.json();
      })
      .then(() => {
        alert("Registro exitoso");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FormUSer
      btnSend="Registrarse"
      title="Registro de usuario"
      descripcion="Ya tienes cuenta?"
      link1="Iniciar sesión"
      creatUser={true}
      login={true}
      funcion={onSubmit}
    />
  );
};

export default ResgisterUser;
