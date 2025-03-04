import "./styled.css";
import React, { useEffect, useRef, useState } from "react";
import { TaskItem } from "../../utils/interface/taskItem.ts";
import {
  FaRegStar,
  FaStar,
  FaTrash,
  FaArrowDown,
  FaArrowUp,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { MdOutlineCalendarToday } from "react-icons/md";

export interface TaskListProps {
  taskComplete: TaskItem[];
  handleDeletTask: (id: string) => void;
  handlePending: (id: string) => void;
}

export default function TaskComplete({
  taskComplete,
  handleDeletTask,
  handlePending,
}: TaskListProps) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const listRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (buttonStatus && listRef.current) {
      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); //delay pra carregar todas as tasks
    }
  }, [buttonStatus, taskComplete]);

  const toggleButtonStatus = () => {
    setButtonStatus(!buttonStatus);
  };

  const clickToDelete = (idTask: string) => {
    handleDeletTask(idTask);
  };
  const clickToComplete = (idTask: string) => {
    handlePending(idTask);
  };
  return (
    <div
      className={`taskCompletedContainer ${
        taskComplete.length > 0 ? "" : "hidden"
      }`}
    >
      <button
        className={`buttonCompleted ${taskComplete.length > 0 ? "" : "hidden"}`}
        onClick={toggleButtonStatus}
      >
        Concluídas({taskComplete.length}){" "}
        {buttonStatus ? (
          <FaArrowDown className="arrow" />
        ) : (
          <FaArrowUp className="arrow" />
        )}
      </button>
      <div className={`taskCompletedWrapper ${buttonStatus ? "" : "hidden"}`}>
        <ul>
          {taskComplete ? (
            taskComplete.map((task, index) => {
              return (
                <li
                  className="listItem"
                  key={task.id}
                  ref={index === taskComplete.length - 1 ? listRef : null}
                >
                  <button
                    onClick={() => {
                      clickToComplete(task.id);
                    }}
                    className="taskBt"
                    title="concluir"
                  >
                    <FaRegCircleCheck />
                  </button>
                  <input
                    className="taskTittleComplete"
                    defaultValue={task.value}
                    readOnly
                  />
                  <div className="taskSec">
                    <MdOutlineCalendarToday title="Vencimento" />
                  </div>
                  <div className="taskSec">
                    {task.favorite ? (
                      <FaStar title="Favoritos"></FaStar>
                    ) : (
                      <FaRegStar title="Favoritos"></FaRegStar>
                    )}
                  </div>
                  <div className="taskSec taskTrash">
                    <button
                      className="btTrash"
                      onClick={() => clickToDelete(task.id)}
                    >
                      <FaTrash title="Excluir tarefa" />
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
