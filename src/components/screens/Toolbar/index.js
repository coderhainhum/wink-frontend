import React from 'react';
import './Toolbar.css';
import M from 'materialize-css'
export default function Toolbar(props) {
    const user=JSON.parse(localStorage.getItem('user'))
    let userPhoto="";
    if(user){
      userPhoto=user.photo
    }
    const { title,changeActiveConversationId,changeActiveConversation } = props;
    const logout=()=>{
      localStorage.clear();
      window.location.reload();
      M.toast({html:"logged out successfully",classes:"#43a047 green darken-1"})
    }
    return (
      <div className="toolbar">
        <div className="left-items"><i className="material-icons toolbar-button" onClick={()=>logout()}>logout</i></div>
        <h1 className="toolbar-title">{ title }</h1>
        <div className="right-items">
          <img src={userPhoto} className="tootlbar-button conversation-photo" onClick={()=>(changeActiveConversationId(""),changeActiveConversation())}></img>
        </div>
      </div>
    );
}