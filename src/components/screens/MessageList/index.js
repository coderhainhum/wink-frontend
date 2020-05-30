import React,{useEffect,useState,useRef} from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/index';
import Input from '../Input/Input'
import './MessageList.css';

const MessageList = ({conversationId,socket,data,setData}) => {
  const user=JSON.parse(localStorage.getItem("user"));
  //const [conversation,setConversation]=useState([])
  var conversation=[];
  if(data==null){
  }
  if(conversation.length==0){
    if(data.data!=undefined&&data!=null){
      conversation=data
      console.log("case1",conversation)
    }
    else{
      conversation=data
      console.log("case2",conversation)
    }
  }
  
    useEffect(()=>{
        fetch(`/getConversation/${conversationId}`)
        .then(res=>res.json())
        .then(result=>{
            setData(result)
        })
    },[conversationId])
    //alert(conversation)
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
        setData(data)
        socket.emit('input',{
          conversationId:conversationId,
        },{data:data});
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
        <Input sendMessage={sendMessage} messages={messages} socket={socket}/>
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