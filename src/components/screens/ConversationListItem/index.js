import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import './ConversationListItem.css';
export default function ConversationListItem(props) {
    const user=JSON.parse(localStorage.getItem("user"));
    console.log("user",user)
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
    var lastMessage=item.messages.pop()
    
    const deleteButton=(id)=>{
        alert(id)
        fetch(`/deleteConversation/${id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            setConversationId("")
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="conversation-list-box">
            <div className="conversation-list-item" onClick={()=>{setConversationId(item._id)}}>
                <img className="conversation-photo" src={person.photo} alt="conversation" />
                <div className="conversation-info" >
                    <h1 className="conversation-title">{ person.name }</h1>
                    {/* <p className="conversation-snippet">{ lastMessage }</p> */}
                </div>
            </div>
            <div className="delete-button">
                <div>
                    <i className="material-icons" onClick={()=>deleteButton(item._id)}>delete</i>
                </div>
            </div>
        </div>
    );
}