import React, { useState } from "react"
import './style.css'
interface FormProps {
  adicionarTarefas: (novatarefa: string) => void
}
export function Form({adicionarTarefas}: FormProps){

  const [input, setInput] = useState('');

  const handleSubmit = (e : React.FormEvent) =>{
    e.preventDefault()
    adicionarTarefas(input)
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
      placeholder="adicione um tarefa"
      autoComplete="off"
      />
      <button>adicionar task</button>
    </form>
  )
}
