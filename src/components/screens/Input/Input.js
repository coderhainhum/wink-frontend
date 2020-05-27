import React,{useState,useEffect} from 'react';

import './Input.css';

const Input = ({sendMessage,messages}) =>{ 
  const messag=messages
  const [message,setMessage]=useState("")
  console.log(messag)
  useEffect(()=>{
    setMessage(" ")
  },[messag])
  return(
    <div className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(message): null}
      />
      <button className="sendButton" onClick={e => sendMessage(message)}>Send</button>
    </div>
)
}

export default Input;