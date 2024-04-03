import React, { useState } from "react";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Rboard from "./pages/Rboard";

import FindIDPW from "./pages/FindIDPW";
import Main1 from "./pages/Main1";
import Main2 from "./pages/Main2";
import Profil from "./pages/Profil";
import Register from './pages/Register';
import Exp from "./pages/Exp";
import Admin from "./pages/Admin";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./pages/Cateogory";
import Dpage from "./pages/Dpage";
import Writepost from "./pages/Writepost";
import Chatbot from "./components/chatbot/ChatBot ";
import logo from "./navlogo.png";
import closeIcon from "./closeicon.png";


function App() {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => setChatOpen(!chatOpen);

  return (
    <div className="App">
      <div onClick={toggleChat} className="chat-icon">
        {/* 아이콘을 클릭하면 챗봇이 토글됩니다 */}
        <div onClick={toggleChat} className="chat-icon">
          <img
            src={chatOpen ? closeIcon : logo}
            className="chat-icon-img"
            alt="Chat Icon"
          />
        </div>
        <Chatbot isOpen={chatOpen} toggleChat={toggleChat} />
      </div>
      <Chatbot isOpen={chatOpen} toggleChat={toggleChat} />
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
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/Exp" element={<Exp />} />
        <Route path="/rboard/:shoe_seq" element={<Rboard />} />

        <Route path="/admin" element={<admin />} />
        <Route path="/boards/:board_seq" element={<Dpage />} />
      </Routes>
    </div>
  );
}

export default App;
