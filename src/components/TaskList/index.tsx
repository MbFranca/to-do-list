import './style.css'
import React from 'react'
import {FaRegStar,FaRegCircle, FaTrash } from 'react-icons/fa'
import {MdOutlineCalendarToday } from 'react-icons/md'
import {TaskItem} from '../../utils/interface/taskItem.ts';

interface TaskListProps {
  items: TaskItem[];
  handleDeletTask: (id:string)=> void;
  handleComplete: (id:string)=> void;
}

export default function TaskList({items, handleDeletTask, handleComplete}:TaskListProps){
  const clickToDelete = (idTask: string) => {
      handleDeletTask(idTask)
  };

  const clickToComplete = (idTask: string) => {
    handleComplete(idTask)
};

  return(
    <div className='taskListContainer'>
      <div className='taskList'>
        <ul>
          {items.length == 0 ? '':
          <div className='taskListDescription'>
            <button className='taskBt' ></button>
            <input type='text' className='taskTittle' placeholder="Título" disabled></input>
            <input type='text' className='taskSec' placeholder="Vencimento" disabled></input>
            <input type='text' className='taskSec' placeholder="Urgência" disabled></input>
          </div>}
          {items
          .slice() // cria cópia sem mudar o original
          .reverse() // inverte
          .map((item)=>{
            return <li key={item.id} className='listItem'>
              <button
                className='taskBt'
                title='concluir'
                  onClick={()=>{clickToComplete(item.id)}}
                >
                <FaRegCircle></FaRegCircle>
              </button>
              <input className='taskTittle' value={item.value}></input>
              <div
                className='taskSec'>
                <MdOutlineCalendarToday title='Vencimento'>
                </MdOutlineCalendarToday>
              </div>
              <div className='taskSec'>
                <FaRegStar title='Favoritos'>
                </FaRegStar>
              </div>
              <div className='taskSec taskTrash'>
                <button
                  className='btTrash'
                  onClick={()=>clickToDelete(item.id)}>
                  <FaTrash title='Excluir tarefa'>
                  </FaTrash>
                </button>
                </div>
              </li>
          })}
        </ul>
      </div>
    </div>

  )
}
