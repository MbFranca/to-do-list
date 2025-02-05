import React, { use, useEffect, useState } from "react"
import './style.css'
import { FaBars } from "react-icons/fa6"
import TaskList from "../TaskList/index.tsx"
import { Form } from "../Form/index.tsx"
import { v4 as generateUUID } from "uuid";
import ModelDelete from "../ModelDelete/index.tsx"
import TaskComplete from "../TaskComplete/index.tsx"

export default function TaskContainer({buttonStatus, toggleBtStatus}){
  // task estado
  // ou atribui diretamente ou atribui com o retorno de uma fn
  const [items, setItems] = useState<{ id: string; value: string }[]>([]);
  const [itemsToDelete, setItemsToDelete] = useState<String|null>(null);
  const [showModel, setShowModel] = useState(false)
  const [taskComplete, setTaskComplete] = useState<{ id: string; value: string }[]>([]);

  // handle completed task
  //nao usamos, prev para obter o estado mais atualizado do storage
  const handleCompleteTask = (taskId: string) => {
    const taskCompleted = items.find((task) => task.id === taskId);
    if (!taskCompleted) return;
    const storedCompletedTasks = localStorage.getItem("CompletedTasks");
    const completedTasksArray = storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
    const updatedCompletedTasks = [...completedTasksArray, taskCompleted];
    setTaskComplete(updatedCompletedTasks);
      localStorage.setItem("CompletedTasks", JSON.stringify(updatedCompletedTasks));

    setItems((prevItems) => {
      const updatedItems = prevItems.filter((task) => task.id !== taskId);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };


  // chamar tela de delete
  const handleDeleteTask = (taskId: string) => {
    console.log('OPS 1')
    setItemsToDelete(taskId);
    setShowModel(true);

  }
  //Deletar task
  const handleConfirmDelete = (clikBt:boolean) =>{
    console.log('OPS 2')
    if (!itemsToDelete) {
      return;
    }
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
    setTaskComplete((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== itemsToDelete);
      localStorage.setItem("CompletedTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
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
  //GET das tasks pendentes
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
    //GET das tasks completas
    useEffect(()=>{
      const storedCompletedTasks  = localStorage.getItem("CompletedTasks")
      if(storedCompletedTasks ){
        try {
          const parsedItems = JSON.parse(storedCompletedTasks )
          if(Array.isArray(parsedItems))
            setTaskComplete(parsedItems)
        } catch (e) {
          console.log(e)
        }
      }
    },[])

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
        <TaskList items={items} handleDeletTask={handleDeleteTask} handleComplete={handleCompleteTask}></TaskList>
        <TaskComplete taskComplete={taskComplete} handleDeletTask={handleDeleteTask}></TaskComplete>
      </div>
      {showModel? <ModelDelete handleConfirmDelet={handleConfirmDelete}  ></ModelDelete>: ''}

    </div>
  )
}


