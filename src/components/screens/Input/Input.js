import React,{useState} from 'react';

import './Input.css';

const Input = ({sendMessage}) =>{ 
  const [message,setMessage]=useState("")
  return(
    <div className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        onChange={({ target: { value } }) => setMessage(value)}
        // onKeyPress={event => event.key === 'Enter' ? sendMessage(message): null}
      />
      <button className="sendButton" onClick={e => sendMessage(message)}>Send</button>
    </div>
)
}

export default Input;