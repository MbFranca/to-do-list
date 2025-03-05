// src/components/Register/index.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import './style.css'; // Importando o arquivo CSS para a estilização

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate("/main"); // Redireciona para a página principal após o registro
    } catch (err) {
      setError("Falha no registro. Verifique suas informações.");
    }
  };

  return (
    <div className="registerContainer">
      <h2>Criar Conta</h2>
      <form className="registerForm" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="errorMessage">{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
