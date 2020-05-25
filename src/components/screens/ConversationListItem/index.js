import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import './ConversationListItem.css';
export default function ConversationListItem(props) {
    const user=JSON.parse(localStorage.getItem("user"));
    const userId=(user._id)
    const item = props.data;
    const setConversationId=props.setConversationId;
    var person=null
    if(userId==item.person1._id){
        person=item.person2
    }
    else if(userId==item.person2._id){
        person=item.person1
    }
    console.log("item1",item)
    var lastMessage=item.messages.pop()
    
    return (
        <div className="conversation-list-item" onClick={()=>{setConversationId(item._id)}}>
            <img className="conversation-photo" src={person.photo} alt="conversation" />
            <div className="conversation-info" >
                <h1 className="conversation-title">{ person.name }</h1>
                {/* <p className="conversation-snippet">{ lastMessage }</p> */}
            </div>
        </div>
    );
}