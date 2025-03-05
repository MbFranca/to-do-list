// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {auth } from "./firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth"; // Importando o signOut
import Login from "./components/Login/index.tsx";
import Register from "./components/Register/index.tsx";
import Main from "./components/Main/index.tsx";
import Header from "./components/Header/index.tsx";
import "./App.css"

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Método para fazer o logout
      setUser(null); // Limpa o estado do usuário
    } catch (err) {
      console.log("Erro ao sair: ", err);
    }
  };

  return (
    <Router>
      <div className="appContainer">
        <Header />
        {user && <button onClick={handleLogout}>Sair</button>} {/* Botão de logout exibido se o usuário estiver logado */}
        <Routes>
          <Route path="/" element={user ? <Main /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={user ? <Main /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
