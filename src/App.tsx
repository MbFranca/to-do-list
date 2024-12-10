import React, { useState } from 'react';
import { Form } from './components/Form/index.tsx';
import './App.css'
import { Header } from './components/Header/index.tsx';
import { Tarefas } from './components/Tarefas/index.tsx';
import { toast } from 'react-toastify';

function App() {
  const [tarefas, setTarefas] = useState(['Estudar React'])

  const adicionarTarefas = (novatarefa: string) => {
    if(novatarefa.trim() === '') {
      toast.error('O campo "tarefas" não pode ser deixado em branco. Por favor, preencha-o antes de enviar.')
      return;
    }
    setTarefas([...tarefas, novatarefa])
  }
  return (
    <div className="App">
      <Header></Header>
        <div className='formContainer'>
          <h1>Suas Tarefas</h1>
          <Form adicionarTarefas={adicionarTarefas}></Form>
          <Tarefas tarefas={tarefas}></Tarefas>
        </div>
    </div>
  );
}

export default App;
