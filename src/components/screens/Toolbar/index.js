import React from 'react';
import './Toolbar.css';
import M from 'materialize-css'
export default function Toolbar(props) {
    const { title } = props;
    const logout=()=>{
      localStorage.clear();
      window.location.reload();
      M.toast({html:"logged out successfully",classes:"#43a047 green darken-1"})
    }
    return (
      <div className="toolbar">
        <div className="left-items"><i className="material-icons toolbar-button" onClick={()=>logout()}>logout</i></div>
        <h1 className="toolbar-title">{ title }</h1>
        <div className="right-items"><i className="material-icons toolbar-button">add</i></div>
      </div>
    );
}