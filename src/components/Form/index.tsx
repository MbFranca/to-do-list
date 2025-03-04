import React, { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import "./style.css";
interface FormComponentProps {
  onAddItem: (item: string, groupItem?: string) => void;
}

export function Form({ onAddItem }: FormComponentProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputGroupValue, setInputGroupValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
      inputGroupValue
    );
    setInputValue("");
    setInputGroupValue("")
  };
  return (
    <form action="#" className="form" onSubmit={handleSubmit}>
      <div className="formTaskName">
        <button title="Adicionar"> + </button>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          name="task"
          id="itask"
          value={inputValue}
          placeholder="Adicione um tarefa"
          autoComplete="off"
        />
      </div>
      <div className="formDetails">
        <label htmlFor="" className="labelDetails">
          <input type="date" className="inputDetails" />
        </label>
        <label htmlFor="" className="labelDetails">
          <input
            type="text"
            className="inputDetails"
            value={inputGroupValue}
            onChange={(e) => setInputGroupValue(e.target.value)}
          />
          <FaListAlt></FaListAlt>
        </label>
        <label htmlFor="" className="labelDetails">
          <input type="text" className="inputDetails" />
          <FaListAlt></FaListAlt>
        </label>
      </div>
    </form>
  );
}
