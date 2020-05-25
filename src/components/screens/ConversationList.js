import React, {useState, useEffect} from 'react'
import ConversationListItem from './ConversationListItem/index'
import Toolbar from './Toolbar/index'

export default function ConversationList(props) {
    const conversations=props.data
    console.log("fursat",props.data)
    return (
      <div className="conversation-list" >
        <Toolbar
            title="Wink"
        />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation._id}
              data={conversation}
            />
          )
        }
      </div>
    );
}
