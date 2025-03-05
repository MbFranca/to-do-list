// src/components/Login/index.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import './style.css'; // Importando o arquivo CSS para a estilização

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate("/main"); // Redireciona para a página principal após o login
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <div className="registerLink">
        <p>
          Não tem uma conta? <a href="/register">Registrar-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
