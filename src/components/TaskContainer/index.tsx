import React, { useEffect, useState } from "react"
import './style.css'
import { FaBars } from "react-icons/fa6"
import TaskList from "../TaskList/index.tsx"
import { Form } from "../Form/index.tsx"
import { v4 as generateUUID } from "uuid";
import ModelDelete from "../ModelDelete/index.tsx"

export default function TaskContainer({buttonStatus, toggleBtStatus}){
  // task estado
  // ou atribui diretamente ou atribui com o retorno de uma fn
  const [items, setItems] = useState<{ id: string; value: string }[]>([]);
  const [itemsToDelete, setItemsToDelete] = useState<String|null>(null);
  const [showModel, setShowModel] = useState(false)

  const handleDeleteTask = (taskId: string) => {
    setItemsToDelete(taskId);
    setShowModel(true);
  }
  //Deletar task
  const handleConfirmDelete = (clikBt:boolean) =>{
    if (!itemsToDelete) return;
    if (clikBt) {
      setItemsToDelete('');
      setShowModel(false);
      return
    }


    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item)=> item.id !== itemsToDelete);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems
    })
    setItemsToDelete('');
    setShowModel(false);
  }
  // adiciona Task
  const handleAddItem = (newItem: string) => {
    if (newItem.trim() !== "") {
      const newItemObject = { id: generateUUID(), value: newItem };
      setItems((prevItems) => {
        const updatedItems = [...prevItems, newItemObject];
        localStorage.setItem("items", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };
  //GET do localstorage
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);

        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        } else {
          console.error("Invalid data in localStorage, not an array.");
        }
      } catch (error) {
        console.error("Error parsing items from localStorage:", error);
      }
    } else {
      console.log("No items found in localStorage.");
    }
  }, []);

  return(
    <div className="taskContainer">
      <div className="taskHeaderContainer">
        <div className="bt-wrapper">
    {buttonStatus? '':<button className={`mainMenuButton`}onClick={toggleBtStatus}><FaBars></FaBars></button>}
        </div>
      </div>
      <div className="taskMainContainer">
        <div className="formContainer">
          menu
        <Form onAddItem={handleAddItem}></Form>
        </div>
        <TaskList items={items}
        handleDeletTask={handleDeleteTask}
        ></TaskList>
      </div>
      {showModel? <ModelDelete handleConfirmDelet={handleConfirmDelete}></ModelDelete>: ''}

    </div>
  )
}


