import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import './style.css'
import { toast } from "react-toastify";

interface TarefasProps {
  tarefas: string[];
  removeTask: (index: number) => void;
  editTask: (index: number, tarefaEditada: string) => void;
}

export function Tarefas({tarefas, removeTask, editTask}: TarefasProps) {

  const [tarefaEditada, setTarefaEditada] = useState('')
  const [indexAtualTarefa, setIndexAtualTarefa] = useState<number|null>(null)

  const trashTask = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    removeTask(index);
    event.preventDefault();
  };
  const modify = (index:number, event: React.MouseEvent<HTMLButtonElement>) => {
    if(indexAtualTarefa !== null){
      editTask(indexAtualTarefa, tarefaEditada)
      setIndexAtualTarefa(null)
    }else{
      setIndexAtualTarefa(index)
      setTarefaEditada(tarefas[index])
    }
    event.preventDefault();
  }
  const saveEditedText = (index:number, event: React.MouseEvent<HTMLButtonElement>) =>{
    if(tarefaEditada.trim() === '') {
      toast.error('A tarefa não pode ser vazia!')
      return;
    }
    editTask(index, tarefaEditada)
    setIndexAtualTarefa(null)
    event.preventDefault()
  }
  return (
    <div className="tarefasContainer">
      <ul className="listaTarefas">
        {tarefas.map((tarefa, index) => (
          <li key={index} className="itemTarefa">
            <input
               className={`itemText ${indexAtualTarefa === index && tarefaEditada.trim() === '' ? 'emptyInput' : ''}`}
              type="text"
              value={indexAtualTarefa === index? tarefaEditada : tarefa}
              onChange={(e)=> setTarefaEditada(e.target.value)}
              disabled={indexAtualTarefa === null}
              >
            </input>
            <div className="itenButtons">

                {indexAtualTarefa === index ? (

                  <button
                  className="saveButton"
                  onClick={(event) => saveEditedText(index,event)}
                  >
                  <FaSave className="saveIcon" />
                </button>

                ):(

                  <button
                  className="editButton"
                  onClick={(event) => modify(index, event)}>
                  <FaEdit className="editIcon"
                 />
                </button>

                )}

              <button
                className="trashButton"
                onClick={(event) => trashTask(index, event)}>
                <FaTrash className="trashIcon" />
              </button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
