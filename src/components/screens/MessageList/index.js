import React,{useEffect,useState,useRef} from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import ReactDOM from 'react-dom'

import Message from '../Message/index';
import Input from '../Input/Input'
import ConversationBar from '../ConversationBar/index'
import './MessageList.css';
import { Loading } from '../LoadingComponent';
const MessageList = (props) => {

  
  const [width,setWidth]=useState(0)
  const messagesEndRef = useRef(null)
  let messages=[]
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages]);

  var parentElementWidth=0;
  let ddstyle={}
  function changeFixedElementWidth() {
    parentElementWidth = messagesEndRef.current ? messagesEndRef.current.offsetWidth :100
    setWidth(parentElementWidth)
  }
  window.addEventListener('click', changeFixedElementWidth);
  window.addEventListener('resize', changeFixedElementWidth);
  ddstyle={
    width:width+"px"
  }

  const user=JSON.parse(localStorage.getItem('user'))
  if (props.conversationsData.isActiveLoading) {
    return(
        <div className="container">
            <div className="row">    
            <div ref={messagesEndRef} />        
                <div className="conversationHome">
                  <img className="conversationLogo" src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1593296441/wink_y6vgmt.jpg" alt="conversation" />
                  <h3>Hello {user.name}!</h3>
                  <h5>START A CONVERSATION</h5>
                </div>
                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
} 
  else if(props.conversationsData.isLoading){
    return(
      <div className="container">
          <div className="row">    
          <div ref={messagesEndRef} />        
              <Loading />
              <div ref={messagesEndRef}/>
          </div>
      </div>
  );
  }
  else{
    const conversation=props.conversationsData.activeConversation
    const socket=props.socket
    const conversationId=props.conversationId
    
      
      if(conversation){
        messages=(conversation.messages)
      }
      
      const sendMessage=(message)=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        const messageBody={
          conversationId:conversationId,
          data:message,
          senderId:user._id,
          time:dateTime,
        }
        props.newMessage(messageBody)
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
      <div className="userInfo">
          <img className="conversationLogo" src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1593296441/wink_y6vgmt.jpg" alt="conversation" />
          <h3>Hello {user.name}!</h3>
          <h5>START A CONVERSATION</h5>
        <div ref={messagesEndRef} />
      </div>
      }
      </>

    )
  }
  
  }

export default MessageList;