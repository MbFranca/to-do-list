import React, { useState } from "react"
import './style.css'
import { toast } from "react-toastify";
interface FormProps {
  adicionarTarefas: (novatarefa: string) => void
}
export function Form({adicionarTarefas}: FormProps){

  const [input, setInput] = useState('');

  const handleSubmit = (e : React.FormEvent) =>{
    e.preventDefault()
    adicionarTarefas(input)
    toast.success('Tarefa adicionada!')
    setInput('')
  }

  return(
    <form action="#" className="form" onSubmit={handleSubmit}>
      <input
      type="text"
      name="task"
      id="itask"
      value={input}
      onChange={(e)=> setInput(e.target.value)}
      placeholder="tarefas"
      />
      <button>adicionar task</button>
    </form>
  )
}
