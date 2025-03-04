import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "./style.css";

interface GroupProps {
  group: string[];
  handleSelectGroup: (gruop: string) => void;
}

export function NavMain({group, handleSelectGroup} : GroupProps) {
  const [buttonStatus, setButtonStatus] = useState(false);

  const toggleBtStatus = () => {
    setButtonStatus(!buttonStatus);
  };
  const clickToSelect = (value: string) => {
    handleSelectGroup(value)

  }

  return (
    <div className="formContainerHeader">
      <nav className="wrapperContainerHeader">
        <div className="headerInformations">
          <button className="headerButtons">Dia</button>
          <button className="headerButtons">Layout 1</button>
          <button className="headerButtons">layout 2</button>
        </div>
        <div className="headerOptions">
          <button className="headerButtons">Classificar</button>
          <div className="groupLt">
          <OutsideClickHandler onOutsideClick={()=> setButtonStatus(false)}>
            <button className="headerButtons" onClick={toggleBtStatus}>
              Group
            </button>
              {buttonStatus ? (
                <div className="listGroup">
                  <div className="listGroupTittle">Agrupar por</div>
                  {group.map((value, index) => (
                    <button key={index} className="itemGroup" onClick={()=> clickToSelect(value)}>
                      {value}
                    </button>
                  ))}
                  <button className="itemGroup" onClick={()=> clickToSelect("all")}>Mostrar tudo</button>
                </div>
              ) : (
                ""
              )}
            </OutsideClickHandler>
          </div>
          <button className="headerButtons">Sugestões</button>
        </div>
      </nav>
    </div>
  );
}
