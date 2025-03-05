import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebaseConfig";
import {signInWithEmailAndPassword} from 'firebase/auth'

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Você saiu com sucesso!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
