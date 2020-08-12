import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import './ConversationListItem.css';
export default function ConversationListItem(props) {
    const user=JSON.parse(localStorage.getItem("user"));
    const userId=(user._id)
    const item = props.conversation;
    //item means conversation
    if(item){
        console.log("item",item)
        const changeActiveConversationId=props.changeActiveConversationId;
        const changeActiveConversation=props.changeActiveConversation;
    var person=null
    if(item){
        if(userId==item.person1._id){
            person=item.person2
        }
        else if(userId==item.person2._id){
            person=item.person1
        }
    }
    
    const deleteButton=(id)=>{
        fetch(`/deleteConversation/${id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            changeActiveConversationId(" ")
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="conversation-list-box">
            <div className="conversation-list-item" onClick={()=>(changeActiveConversationId(item._id),changeActiveConversation())}>
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
    else{
        return(<div>ji</div>)
    }
}