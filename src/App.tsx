import React, { useState } from 'react';
import { Form } from './components/Form/index.tsx';
import './App.css';
import { Header } from './components/Header/index.tsx';
import { Tarefas } from './components/Tarefas/index.tsx';
import { toast } from 'react-toastify';

interface Tarefa {
  id: number;
  nome: string;
}

function App() {
 
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionarTarefas = (novatarefa: string) => {
    if (novatarefa.trim() === '') {
      toast.error('O campo "tarefas" não pode ser deixado em branco. Por favor, preencha-o antes de enviar.');
      return;
    }

    const novaTarefa: Tarefa = {
      id: Date.now(),
      nome: novatarefa
    };
    toast.success('Tarefa adicionada!');
    setTarefas([...tarefas, novaTarefa]);
  };

  const removeTask = (id: number) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
  };

  const editTask = (id: number, tarefaEditada: string) => {
    if (tarefaEditada.trim() === '') {
      toast.error('A tarefa não pode ser vazia!');
      return;
    }
    const novasTarefas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, nome: tarefaEditada } : tarefa
    );
    setTarefas(novasTarefas);
    toast.success('Tarefa editada com sucesso!');
  };

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
