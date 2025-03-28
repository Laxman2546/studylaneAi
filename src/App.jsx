import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
