import React, { useState } from "react"
import './style.css'

interface FormComponentProps {
  onAddItem: (item:string) => void;
}

export function Form({onAddItem}:FormComponentProps){
  const [inputValue, setInputValue] = useState("")
  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    onAddItem(inputValue.charAt(0).toUpperCase() + inputValue.slice(1))
    setInputValue("")
  }
  return(
    <form action="#" className="form" onSubmit={handleSubmit}>
      <button title="Adicionar"> + </button>
      <input
      onChange={(e)=> setInputValue(e.target.value)}
      type="text"
      name="task"
      id="itask"
      value={inputValue}
      placeholder="Adicione um tarefa"
      autoComplete="off"
      />
    </form>
  )
}
