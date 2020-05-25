import React,{useEffect,useState} from 'react';

// import ScrollToBottom from 'react-scroll-to-bottom';

// import Message from '../Message/index';

import './MessageList.css';

const MessageList = ({conversation}) => {
  const chats=(conversation.messages)
  return(
    <>
    {chats?
      <div>
      {chats.map((message,i)=><div key={i}>{message.data}</div>)}
    </div>
    :
    <h2>Start a conversation</h2>
    }
    </>

  )
  // <ScrollToBottom className="messages">

  //   {conversation.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  // </ScrollToBottom> 
  }

export default MessageList;