import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


export const fetchConversations=()=>(dispatch)=>{
    dispatch(conversationsLoading(true));
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
        return fetch('conversationList',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:user._id
            })
        }).then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var error=new Error('Error'+response.status+':'+response.statusText);
                error.response=response;
                throw error;
            }
        },
        error=>{
            var errMess=new Error(error.message);
            throw errMess;
        })
        .then(response=>response.json())
        .then(conversations=>dispatch(addConversations(conversations)))
        .catch(error=>{console.log('fetch conversations',error.message)})
    }
}

export const conversationsLoading=()=>({
    type:ActionTypes.CONVERSATIONS_LOADING
})

export const conversationsFailed=(errMess)=>({
    type:ActionTypes.CONVERSATION_FAILED,
    payload:errMess
})

export const addConversations=(conversations)=>({
    type:ActionTypes.ADD_CONVERSATIONS,
    payload:conversations
})

export const activeConversationId=(conversationId)=>(dispatch)=>{
    dispatch(setActiveConversationId(conversationId))
    dispatch(activeConversationLoading(true))
    dispatch(setActiveConversation())
}

export const setActiveConversationId=(conversationId)=>({
    type:ActionTypes.SET_ACTIVE_CONVERSATIONID,
    payload:conversationId
})

// export const activeConversation=()=>(dispatch)=>{
//     dispatch(activeConversationLoading(true))

//     dispatch(setActiveConversation())
// }

export const activeConversationLoading=()=>({
    type:ActionTypes.ACTIVE_CONVERSATIONS_LOADING
})

export const activeConversationsFailed=(errMess)=>({
    type:ActionTypes.ACTIVE_CONVERSATION_FAILED,
    payload:errMess
})

export const setActiveConversation=()=>({
    type:ActionTypes.SET_ACTIVE_CONVERSATION
})

export const newMessage=(messageBody)=>(dispatch)=>{
    const user=JSON.parse(localStorage.getItem('user'))
    let message={
        conversationId:messageBody.conversationId,
        data:messageBody.message,
        senderId:user._id
    }
    fetch(baseUrl+'/createMessage',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(messageBody)
    }).then(response=>{
        if(response.ok){
            
        } else{
            var error=new Error('Error'+response.status+':'+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response=>dispatch(addMessage(message)))
    .catch(error=>{console.log('new message',error.message)})
}

export const addMessage=(messageBody)=>({
    type:ActionTypes.ADD_MESSAGE,
    payload:messageBody
})