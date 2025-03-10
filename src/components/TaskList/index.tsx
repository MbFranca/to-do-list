import "./style.css";
import React from "react";
import { FaRegStar, FaRegCircle, FaTrash } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TaskItem } from "../../utils/interface/taskItem.ts";
import { FaStar } from "react-icons/fa6";

interface TaskListProps {
  items: TaskItem[];
  handleDeletTask: (id: string) => void;
  handleComplete: (id: string) => void;
  handleAddImportant: (id: string) => void;
  groupFilter?: string;
}

export default function TaskList({
  items,
  handleDeletTask,
  handleComplete,
  handleAddImportant,
  groupFilter,
}: TaskListProps) {
  const clickToDelete = (idTask: string) => {
    handleDeletTask(idTask);
  };

  const clickToComplete = (idTask: string) => {
    handleComplete(idTask);
  };
  const toggleImportantStatus = (idTask: string) => {
    handleAddImportant(idTask);
  };

  const filteredItems =
  !groupFilter || groupFilter === "all"
    ? items
    : items.filter((item) => item.group === groupFilter);

  return (
    <div className="taskListContainer">
      <div className="taskList">
        <ul>
          {filteredItems.length === 0 ? (
            ""
          ) : (
            <div className="taskListDescription">
              <button className="taskBt"></button>
              <input
                type="text"
                className="taskTittle"
                placeholder="Título"
                disabled
              ></input>
              <input
                type="text"
                className="taskSec"
                placeholder="Vencimento"
                disabled
              ></input>
              <input
                type="text"
                className="taskSec"
                placeholder="Favoritos"
                disabled
              ></input>
              <input
                type="text"
                className="taskSec"
                placeholder=""
                disabled
              ></input>
            </div>
          )}
          {filteredItems
            .slice() // cria cópia sem mudar o original
            .reverse() // inverte
            .map((item) => {
              return (
                <li key={item.id} className="listItem">
                  <button
                    className="taskBt"
                    title="concluir"
                    onClick={() => {
                      clickToComplete(item.id);
                    }}
                  >
                    <FaRegCircle></FaRegCircle>
                  </button>
                  <input
                    className="taskTittle"
                    value={item.value}
                    disabled
                  ></input>
                  <div className="taskSec">
                    <MdOutlineCalendarToday title="Vencimento"></MdOutlineCalendarToday>
                  </div>
                  <div className="taskSec">
                    {item.favorite ? (
                      <FaStar
                        title="Favoritos"
                        onClick={() => toggleImportantStatus(item.id)}
                      ></FaStar>
                    ) : (
                      <FaRegStar
                        title="Favoritos"
                        onClick={() => toggleImportantStatus(item.id)}
                      ></FaRegStar>
                    )}
                  </div>
                  <div className="taskSec taskTrash">
                    <button
                      className="btTrash"
                      onClick={() => clickToDelete(item.id)}
                    >
                      <FaTrash title="Excluir tarefa"></FaTrash>
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
