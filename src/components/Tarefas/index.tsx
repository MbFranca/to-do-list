import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import './style.css'
interface Tarefas{
  tarefas: string[]

}

export function Tarefas({tarefas}: Tarefas){

  return(
    <div className="tarefasContainer">
      <ul className="listaTarefas">
        {tarefas.map((tarefa, index) => (
          <li key={index} className="itemTarefa">
            <div className="itemText">
            {tarefa}
            </div>
            <div className="itenButtons">
              <button className="editButton">
                <FaEdit className="editIcon"/>
                </button>
                <button className="trashButton">
                <FaTrash className="trashIcon"/>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
