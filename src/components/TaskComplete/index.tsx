import './style.css'
import React from 'react'
import {TaskItem} from '../../utils/interface/taskItem.ts';

export interface TaskListProps {
  taskComplete: TaskItem[];

}
export default function TaskComplete ({taskComplete}:TaskListProps){
  
  return(
    <div>{taskComplete.map((task)=>{
      return(
        <div>
        {task.value}
      </div>
      )
    })}</div>
  )
}

