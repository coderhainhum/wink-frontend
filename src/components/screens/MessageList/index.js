import React,{useEffect,useState,useRef} from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import ReactDOM from 'react-dom'

import Message from '../Message/index';
import Input from '../Input/Input'
import ConversationBar from '../ConversationBar/index'
import './MessageList.css';

const MessageList = ({conversationId,socket}) => {
  console.log(conversationId)
  const user=JSON.parse(localStorage.getItem("user"));
  var userName=""
  var userPhoto=""
  if(user){
    userName=user.name
    userPhoto=user.photo
  }

  const [conversation,setConversation]=useState([])
  const [width,setWidth]=useState(0)
  
  useEffect(()=>{  
    changeFixedElementWidth()
      fetch(`/getConversation/${conversationId}`)
      .then(res=>res.json())
      .then(result=>{
          setConversation(result) 
      })
  },[conversationId])

    const messages=(conversation.messages)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [messages]);
    
    socket.on('output',function(data){
      if(data!=null && conversation._id===data.data._id){
        setConversation(data.data)
      }
    })

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
        //setConversation(data)
        socket.emit('input',{data:data});
      })
      
  }
  var parentElementWidth=0;
  let ddstyle={}
  function changeFixedElementWidth() {
    parentElementWidth = messagesEndRef.current ? messagesEndRef.current.offsetWidth : 200
    setWidth(parentElementWidth)
  }
  window.addEventListener('load', changeFixedElementWidth);
  window.addEventListener('resize', changeFixedElementWidth);
  ddstyle={
    width:width+"px"
  }
  
  
  return(
    <>
    {messages?
    <div className="message-list-container">
      <ConversationBar conversation={conversation}/>
      <div className="message-box">
        <div className="messages">
          {messages.map((message, i) => <div key={i}><Message message={message}/></div>)}
        </div>
      </div>
      <div ref={messagesEndRef} />
        <div className="input-box" style={ddstyle}>
          <Input sendMessage={sendMessage} messages={messages} socket={socket}/>
        </div>
      </div>
    :
    <div>
      <h2>Welcome</h2>
      <img src={userPhoto}></img>
      <h3>{userName}</h3>

      <div ref={messagesEndRef} />
    </div>
    }
    </>

  )
  }

export default MessageList;