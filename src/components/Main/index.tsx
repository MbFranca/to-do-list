import React, { useState } from "react";
import TaskContainer from "../TaskContainer/index.tsx";
import SideBar from "../SideBar/index.tsx";
import './style.css'
export default function Main(){
  const [buttonStatus, setButtonStatus] = useState(false)

  const toggleBtStatus =()=>{
    setButtonStatus(!buttonStatus)
  }
  return(
    <div className="main">
    <SideBar buttonStatus={buttonStatus} toggleBtStatus={toggleBtStatus}></SideBar>
    <TaskContainer buttonStatus={buttonStatus} toggleBtStatus={toggleBtStatus}>
    </TaskContainer>
    </div>
  )
}

