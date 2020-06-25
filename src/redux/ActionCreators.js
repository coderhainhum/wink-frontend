import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


export const fetchConversations=()=>(dispatch)=>{
    dispatch(conversationsLoading(true));
    const user=JSON.parse(localStorage.getItem('user'))
    return fetch(baseUrl+'conversationList',{
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
}

export const conversationsLoading=()=>({
    type:ActionTypes.$CONVERSATIONS_LOADING
})

export const conversationsFailed=(errMess)=>({
    type:ActionTypes.CONVERSATION_FAILED,
    payload:errMess
})

export const addConversations=(conversations)=>({
    type:ActionTypes.ADD_CONVERSATIONS,
    payload:conversations
})

export const activeConversation=(conversationId)=>(dispatch)=>{
    dispatch(activeConversationLoading(true))

    dispatch(setActiveConversation(conversationId))
}

export const activeConversationLoading=()=>({
    type:ActionTypes.ACTIVE_CONVERSATIONS_LOADING
})

export const activeConversationsFailed=(errMess)=>({
    type:ActionTypes.ACTIVE_CONVERSATION_FAILED,
    payload:errMess
})

export const setActiveConversation=(conversationId)=>({
    type:ActionTypes.SET_ACTIVE_CONVERSATION,
    payload:conversationId
})