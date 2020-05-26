import React,{useEffect,useState} from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/index';
import Input from '../Input/Input'
import './MessageList.css';

const MessageList = ({conversation}) => {
  const messages=(conversation.messages)
  //console.log(messages)
  return(
    <>
    {messages?
    <div>
      <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message}/></div>)}
      </ScrollToBottom>
      <Input/>
      </div>
      // <div>
      // {chats.map((message,i)=><div key={i}>{message.data}</div>)}
      // </div>
    :
    <h2>Start a conversation</h2>
    }
    </>

  )
  }

export default MessageList;