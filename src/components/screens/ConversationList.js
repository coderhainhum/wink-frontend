import React, {useState, useEffect} from 'react'
import ConversationListItem from './ConversationListItem/index'
import Toolbar from './Toolbar/index'
import ConversationSearch from './ConversationSearch/index';
export default function ConversationList(props) {
    const conversations=props.data
    const setConversationId=props.setConversationId
    const setConversation=props.setConversation
    return (
      <div className="conversation-list" >
        <Toolbar
            title="Wink"
        />
        <ConversationSearch setConversationId={setConversationId} setConversation={setConversation}/>
        {
          conversations.map(conversation =>
            <ConversationListItem key={conversation._id} data={conversation} setConversationId={setConversationId}/>
          )
        }
      </div>
    );
}
