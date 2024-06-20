import React from "react";
import { Route, Routes } from "react-router-dom";

const RutasHome = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </>
  );
};

export default RutasHome;
