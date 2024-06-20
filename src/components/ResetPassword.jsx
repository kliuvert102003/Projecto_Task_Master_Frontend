import { useNavigate, useParams } from "react-router-dom";
import FormUSer from "./FormUSer";

export const SendEmail = () => {
  const navigate = useNavigate();

  const onsubmit = (data) => {
    const { email } = data;
    fetch("http://localhost:3100/reload-password/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al enviar el correo");
        }

        return res.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <FormUSer
        btnSend="Recuperar contraseña"
        title="Recuperar contraseña"
        funcion={onsubmit}
      />
    </>
  );
};

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { id, email, names } = useParams();

  const onsubmit = (data) => {
    fetch("http://localhost:3100/users/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        email: email,
        names: names,
        password: data.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar el usuario");
        }
        return res.json();
      })
      .then(() => {
        alert("Contraseña actualizada");
        navigate("/");
      });
  };

  return (
    <>
      <FormUSer funcion={onsubmit} />
    </>
  );
};
