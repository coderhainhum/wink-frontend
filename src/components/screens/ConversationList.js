import React, {useState, useEffect} from 'react'
import ConversationListItem from './ConversationListItem/index'
import Toolbar from './Toolbar/index'
import ConversationSearch from './ConversationSearch/index';
export default function ConversationList(props) {
    const conversations=props.conversations
    const changeActiveConversationId=props.changeActiveConversationId
    console.log("andar",conversations)
    if(conversations){
      return (
        <div className="conversation-list" >
          <Toolbar
              title="Wink"
              changeActiveConversationId={changeActiveConversationId}
          />
          <ConversationSearch changeActiveConversationId={changeActiveConversationId}
            newConversation={props.newConversation}
          />
          {
            conversations.map(conversation =>
              <ConversationListItem key={conversation._id} conversation={conversation} changeActiveConversationId={changeActiveConversationId}/>
            )
          }
        </div>
      );
    }
    else{
      return(
        <div>ji</div>
      )
    }
}
