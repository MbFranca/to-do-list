import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaCheck } from 'react-icons/fa';
import './style.css';
import { toast } from 'react-toastify';

interface Tarefa {
  id: number;
  nome: string;
}

interface TarefasProps {
  tarefas: Tarefa[];
  removeTask: (id: number) => void;
  editTask: (id: number, tarefaEditada: string) => void;
}

export function Tarefas({ tarefas, removeTask, editTask }: TarefasProps) {
  const [tarefaEditada, setTarefaEditada] = useState('');
  const [indexAtualTarefa, setIndexAtualTarefa] = useState<number | null>(null);
  const [resolveStatus, setResolveStatus] = useState<Record<number, boolean>>({});

  const handleClick = (id: number) => {
    setResolveStatus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const trashTask = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    removeTask(id);
    event.preventDefault();
  };

  const modify = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (indexAtualTarefa !== null) {
      editTask(indexAtualTarefa, tarefaEditada);
      setIndexAtualTarefa(null);
    } else {
      setIndexAtualTarefa(id);
      setTarefaEditada(tarefas.find((tarefa) => tarefa.id === id)?.nome || '');
    }
    event.preventDefault();
  };

  const saveEditedText = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (tarefaEditada.trim() === '') {
      toast.error('A tarefa não pode ser vazia!');
      return;
    }
    editTask(id, tarefaEditada);
    setIndexAtualTarefa(null);
    event.preventDefault();
  };

  return (
    <div className="tarefasContainer">
      <ul className="listaTarefas">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="itemTarefa">
            <div className="inputContainer">
              <button
                className={`select ${resolveStatus[tarefa.id] ? 'taskCheck' : ''}`}
                onClick={(event) => handleClick(tarefa.id)}
              >
                <FaCheck className={`${resolveStatus[tarefa.id] ? 'checkIcon' : 'hiden'}`} />
              </button>
              <input
                className={`itemText ${resolveStatus[tarefa.id] ? 'resolved' : ''}`}
                type="text"
                value={indexAtualTarefa === tarefa.id ? tarefaEditada : tarefa.nome}
                onChange={(e) => setTarefaEditada(e.target.value)}
                disabled={indexAtualTarefa === null}
              />
            </div>
            <div className="itenButtons">
              <button
                className="trashButton"
                onClick={(event) => trashTask(tarefa.id, event)} 
              >
                <FaTrash className="trashIcon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
