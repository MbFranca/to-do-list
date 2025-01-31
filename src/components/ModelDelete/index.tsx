import React from "react";
import './style.css'
interface ButtonDelete {
  handleConfirmDelet: (btClick:boolean) => void;
}
export default function ModelDelete({handleConfirmDelet}:ButtonDelete){
  const handleClickBt = (btClick:boolean) => {
    handleConfirmDelet(btClick)
  }

  return(
    <div className="modalContainer">
      <div className="modal">
        <div className="modalText" id="text1">Excluir permanente essa tarefa ?</div>
        <div className="modalText"> Você não podera desfazer essa ação</div>
        <div className="ModalWrapper">
          <button id="btCancel" onClick={()=>handleClickBt(true)}> Cancelar </button>
          <button id="btExcluir" onClick={()=>handleClickBt(false)}> Excluir </button>
        </div>
      </div>
    </div>
  )
}
