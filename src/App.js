import React from "react";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Rboard from "./pages/Rboard";

import Register from "./pages/Register";
import Main1 from "./pages/Main1";
import Main2 from "./pages/Main2";
import FindIDPW from "./pages/FindIDPW";
import Profil from "./pages/Profil";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./pages/Cateogory";
import Dpage from "./pages/Dpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main1 />} />
        <Route path="Login" element={<Login />} />
        <Route path="Board" element={<Board />} />
        <Route path="Category" element={<Category />} />
        <Route path="Rboard" element={<Rboard />} />
        {/* <Route path="/boards/:review_idx" element={<DetailPage />} /> */}
        <Route path="Register" element={<Register />} />
        <Route path="Main2" element={<Main2 />} />
        <Route path="FindIDPW" element={<FindIDPW />} />
        <Route path="profil" element={<Profil />} />

        <Route path="/boards/:board_seq" element={<Dpage />} />
      </Routes>
    </div>
  );
}

export default App;
