import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import ResgisterUser from "./components/ResgisterUser";
import { SendEmail, ResetPassword } from "./components/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<ResgisterUser />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route
          path="/reset-password/:id/:email/:names"
          element={<ResetPassword />}
        />
        <Route path="/home/allTasks" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
