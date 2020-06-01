import React from 'react';
import './ConversationBar.css';
import M from 'materialize-css'
export default function ConversationBar({conversation}) {
    const user=JSON.parse(localStorage.getItem('user'))
    const userId=user._id
    var person={}
    if(conversation.person1._id==userId){
        person=conversation.person1
    }
    else if(conversation.person2._id==userId){
        person=conversation.person1
    }
    return (
      <div className="toolbar">
        <div className="left-items"><img src={person.photo} className="tootlbar-button conversation-photo"></img></div>
        <h1 className="toolbar-title">{person.name}</h1>
        <div className="right-items"><i className="material-icons toolbar-button"></i></div>
      </div>
    );
}