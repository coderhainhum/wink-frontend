import React, {useState, useEffect} from 'react'
import ConversationListItem from './ConversationListItem'


export default function ConversationList(props) {
    const conversations=props.data
    console.log("fursat",props.data)
    return (
      <div>
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
