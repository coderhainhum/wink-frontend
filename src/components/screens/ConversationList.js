import React, {useState, useEffect} from 'react'
import ConversationListItem from './ConversationListItem/index'
import Toolbar from './Toolbar/index'
import ConversationSearch from './ConversationSearch/index';
import { Loading } from './LoadingComponent';
export default function ConversationList(props) {

    if(props.conversationsData.isLoading){
      console.log("fool",props)
      return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
      );
    }
    else{
      const conversations=props.conversationsData.conversations
      const changeActiveConversationId=props.changeActiveConversationId
      const changeActiveConversation=props.changeActiveConversation
      console.log("andar",conversations.result)
      if(conversations){
        return (
          <div className="conversation-list" >
            <Toolbar
                title="Wink"
                changeActiveConversationId={changeActiveConversationId}
                changeActiveConversation={changeActiveConversation}
            />
            <ConversationSearch changeActiveConversationId={changeActiveConversationId}
              newConversation={props.newConversation}
              changeActiveConversation={changeActiveConversation}
            />
            {
              conversations.map(conversation =>
                <ConversationListItem key={conversation._id}
                  conversation={conversation}
                  changeActiveConversationId={changeActiveConversationId} 
                  changeActiveConversation={changeActiveConversation}/>
              )
            }
          </div>
        );
      }
      else{
        return(
          <div><Loading/></div>
        )
      }
    }
  
    
}
