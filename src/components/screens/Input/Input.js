import React,{useState,useEffect} from 'react';

import './Input.css';

const Input = ({sendMessage,messages}) =>{ 
  const messag=messages
  const [message,setMessage]=useState("")
  useEffect(()=>{
    setMessage("")
  },[messag])
  return(
    <div className="form">
      <input
        className="messageInput"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(message): null}/>
      <i class="material-icons sendButton" onClick={e => sendMessage(message)}>send</i>
    </div>
)
}

export default Input;