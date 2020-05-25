import React, {useEffect} from 'react';

import './ConversationListItem.css';
export default function ConversationListItem(props) {
    const user=JSON.parse(localStorage.getItem("user"));
    const userId=(user._id)
    const item = props.data;
    var person=null
    if(userId==item.person1._id){
        person=item.person2
    }
    else if(userId==item.person2._id){
        person=item.person1
    }
    var lastMessage=item.messages.pop().data
    console.log(item)
    console.log(lastMessage)
    
    
    
    return (
        <div className="conversation-list-item">
            <img className="conversation-photo" src={person.photo} alt="conversation" />
            <div className="conversation-info">
                <h1 className="conversation-title">{ person.name }</h1>
                <p className="conversation-snippet">{ lastMessage }</p>
            </div>
        </div>
    );
}