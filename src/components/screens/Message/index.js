import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message}) => {
  let isSentByCurrentUser = false;
  const user=JSON.parse(localStorage.getItem("user"));

  if(user._id === message.senderId._id) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">You</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(message.data)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(message.data)}</p>
            </div>
            <p className="sentText pl-10 ">{message.senderId.name}</p>
          </div>
        )
  );
}

export default Message;