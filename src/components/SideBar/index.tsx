import React, { useState } from "react";
import "./style.css";
import { FaBars } from "react-icons/fa6";
export default function SideBar({ toggleBtStatus, buttonStatus }) {
  return (
    <div
      className={`sideBarContainer ${buttonStatus ? "" : "collapsed hidden"}`}
    >
      <div className={`sideBarHeader ${buttonStatus ? "" : "hidden"}`}>
        <button className={`sideBarMenuButton`} onClick={toggleBtStatus}>
          <FaBars></FaBars>
        </button>
      </div>
      <div className={`sideBarMenu ${buttonStatus ? "" : "hidden"}`}>
        <h6>menu</h6>
        <h6>quejo</h6>
      </div>
    </div>
  );
}
