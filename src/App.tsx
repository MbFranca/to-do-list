import React, { useState } from 'react';
import { Form } from './components/Form/index.tsx';
import './App.css'
import { Header } from './components/Header/index.tsx';
import { Tarefas } from './components/Tarefas/index.tsx';
import { toast } from 'react-toastify';

function App() {
  const [tarefas, setTarefas] = useState<string[]>([]);

  const adicionarTarefas = (novatarefa: string) => {
    if (novatarefa.trim() === '') {
      toast.error('O campo "tarefas" não pode ser deixado em branco. Por favor, preencha-o antes de enviar.');
      return;
    }
    toast.success('Tarefa adicionada!');
    setTarefas([...tarefas, novatarefa]);
  };

  const removeTask = (index: number) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  };
  const editTask = (index:number, tarefaEditada:string) =>{
    if(tarefaEditada.trim() == '') {
      toast.error('A tarefa não pode ser vazia!')
      return
    }
    const novasTarefas = [...tarefas];
    novasTarefas[index] = tarefaEditada;
    setTarefas(novasTarefas)
    toast.success('Tarefa editada com sucesso!')
  }
  return (
    <div className="App">
      <Header />
      <div className='formContainer'>
        <h1>Suas Tarefas</h1>
        <Form adicionarTarefas={adicionarTarefas} />
        <Tarefas
          removeTask={removeTask}
          editTask={editTask}
          tarefas={tarefas}
        />
      </div>
    </div>
  );
}

export default App;
