import './style.css';
import React, { useState } from 'react';
import { TaskItem } from '../../utils/interface/taskItem.ts';
import { FaRegCircle, FaRegStar, FaTrash, FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { MdOutlineCalendarToday } from 'react-icons/md';

export interface TaskListProps {
  taskComplete: TaskItem[];
  handleDeletTask : (id: string) => void;
}

export default function TaskComplete({ taskComplete, handleDeletTask}: TaskListProps) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const toggleButtonStatus = () =>{
    setButtonStatus(!buttonStatus)
  }
  const clickToDelete = (idTask: string) => {
    handleDeletTask(idTask)
};

  return (
    <div className='taskCompletedContainer '>
      <button className={`buttonCompleted ${taskComplete.length>0 ? '':'hidden'}`}
      onClick={toggleButtonStatus}>Concluídas({taskComplete.length}) {buttonStatus? <FaArrowDown className='arrow'/> : <FaArrowUp className='arrow'/>}</button>
      <div className={`taskCompletedWrapper ${buttonStatus? '': 'hidden'}`}>
        <ul >
          {taskComplete ? (
            taskComplete.map((task) => {
              return (

                <li className='listItem' key={task.id}>
                  <button
                    className='taskBt'
                    title='concluir'
                    >
                    <FaRegCircle />
                  </button>
                  <input className='taskTittle' defaultValue={task.value} readOnly />
                  <div className='taskSec'>
                    <MdOutlineCalendarToday title='Vencimento' />
                  </div>
                  <div className='taskSec'>
                    <FaRegStar title='Favoritos' />
                  </div>
                  <div className='taskSec taskTrash'>
                    <button className='btTrash' onClick={() => clickToDelete(task.id)}>
                      <FaTrash title='Excluir tarefa' />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No tasks completed</p>
          )}
        </ul>
      </div>
    </div>
  );
}
