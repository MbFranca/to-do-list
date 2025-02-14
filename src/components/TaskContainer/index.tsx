import React, { useEffect, useState } from "react"
import './style.css'
import { FaBars } from "react-icons/fa6"
import TaskList from "../TaskList/index.tsx"
import { Form } from "../Form/index.tsx"
import { v4 as generateUUID } from "uuid";
import ModelDelete from "../ModelDelete/index.tsx"
import TaskComplete from "../TaskComplete/index.tsx"
import {Task} from "../../utils/interface/taskItem.ts"
import { toast } from "react-toastify"

export default function TaskContainer({buttonStatus, toggleBtStatus}){
  // task estado
  // ou atribui diretamente ou atribui com o retorno de uma fn
  const [items, setItems] = useState<Task[]>([]);
  const [taskComplete, setTaskComplete] = useState<Task[]>([]);
  const [itemsToDelete, setItemsToDelete] = useState<String|null>(null);
  const [showModel, setShowModel] = useState(false)

  // adicionar completas aos favoritos
  const handleAddImportant  = (taskId: string) => {
    setItems((prevItem) => {
    const updatedItems = prevItem.map((task)=> task.id === taskId ? {...task, favorite: !task.favorite}: task);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    return updatedItems
  })};

  // handle para passar de completed para pending
  const handlePending = (taskId: string) =>{
    const taskToRestore = taskComplete.find((task) => task.id === taskId);
    if (!taskToRestore) return;

    setTaskComplete((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("CompletedTasks", JSON.stringify(updatedTasks));
      return updatedTasks
    });
    setItems((prevItem) => {
      const updatedItems = [...prevItem, taskToRestore]
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems
    });
  }

  // handle completed task
  //nao usamos, prev para obter o estado mais atualizado do storage
  const handleCompleteTask = (taskId: string) => {
    const taskCompleted = items.find((task) => task.id === taskId); // acha
    if (!taskCompleted) return; // caso nao ache
    const storedCompletedTasks = localStorage.getItem("CompletedTasks"); // pega do local
    const completedTasksArray = storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];// oq retornar
    const updatedCompletedTasks = [...completedTasksArray, taskCompleted];// constante com o array atualizado
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
    toast.success('Tarefa excluida !')
  }
  // adiciona Task
  const handleAddItem = (newItem: string) => {
    if (newItem.trim() !== "") {
      const newItemObject = { id: generateUUID(), value: newItem, favorite: false };
      setItems((prevItems) => {
        const updatedItems = [...prevItems, newItemObject];
        localStorage.setItem("items", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
    toast.success('Tarefa adicionada !')
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
          <div className="formContainerHeader">
              <span>Menu</span>
          </div>
        <Form onAddItem={handleAddItem}></Form>
        </div>
        <TaskList items={items}
        handleDeletTask={handleDeleteTask}
        handleComplete={handleCompleteTask}
        handleAddImportant ={handleAddImportant}></TaskList>
        <TaskComplete taskComplete={taskComplete}
        handleDeletTask={handleDeleteTask}
        handlePending={handlePending}></TaskComplete>
      </div>
      {showModel? <ModelDelete handleConfirmDelet={handleConfirmDelete}  ></ModelDelete>: ''}

    </div>
  )
}


