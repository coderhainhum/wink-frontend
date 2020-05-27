import React,{useEffect,useState,useRef} from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/index';
import Input from '../Input/Input'
import './MessageList.css';

const MessageList = ({conversationId}) => {
  const user=JSON.parse(localStorage.getItem("user"));
  const[conversation,setConversation]=useState([])
    useEffect(()=>{
        fetch(`/getConversation/${conversationId}`)
        .then(res=>res.json())
        .then(result=>{
            setConversation(result)
        })
        
    },[conversationId])
    //console.log(conversation)
    const messages=(conversation.messages)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [messages]);
  const sendMessage=(message)=>{
    fetch('/createMessage',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        conversationId:conversationId,
        data:message,
        senderId:user._id
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      setConversation(data)
    })
  }

  return(
    <>
    {messages?
    <div className="message-list-container">
      <div className="message-box">
      <div className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message}/></div>)}
      </div>
      </div>
      <div ref={messagesEndRef} />
      <Input sendMessage={sendMessage}/>
      </div>
    :
    <div>
      <h2>Start a conversation</h2>
      <div ref={messagesEndRef} />
    </div>
    }
    </>

  )
  }

export default MessageList;