import React from "react";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Rboard from "./pages/Rboard";

import FindIDPW from "./pages/FindIDPW";
import Main1 from "./pages/Main1";
import Main2 from "./pages/Main2";
import Profil from "./pages/Profil";
import Register from "./pages/Register";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./pages/Cateogory";
import Dpage from "./pages/Dpage";
import Writepost from "./pages/Writepost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main1 />} />
        <Route path="Login" element={<Login />} />
        <Route path="Board" element={<Board />} />
        <Route path="Category" element={<Category />} />
        <Route path="Rboard" element={<Rboard />} />
        <Route path="Register" element={<Register />} />
        <Route path="Main2" element={<Main2 />} />
        <Route path="FindIDPW" element={<FindIDPW />} />
        <Route path="Profil" element={<Profil />} />
        <Route path="Writepost" element={<Writepost />} />

        <Route path="/boards/:board_seq" element={<Dpage />} />
      </Routes>
    </div>
  );
}

export default App;
