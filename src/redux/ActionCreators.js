import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


export const fetchConversations=()=>(dispatch)=>{
    dispatch(conversationsLoading(true));
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
        console.log("user",user)
        return fetch('conversationList',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
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
    
    //dispatch(setActiveConversation())
}

export const setActiveConversationId=(conversationId)=>({
    type:ActionTypes.SET_ACTIVE_CONVERSATIONID,
    payload:conversationId
})

export const activeConversation=()=>(dispatch)=>{
    console.log("klkl")
    dispatch(activeConversationLoading(true))

    dispatch(setActiveConversation())
}

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
    let message={
        conversationId:messageBody.conversationId,
        data:messageBody.data,
        senderId:messageBody.senderId,
        time:messageBody.time
    }
    fetch('/createMessage',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify(message)
    }).then(response=>{
        if(response.ok){
            return response
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
    .then(response=>response.json())
    .then(response=>(dispatch(addMessage(response))
    ))
    .catch(error=>{console.log('new message',error.message)})
}

export const addMessage=(response)=>({
    type:ActionTypes.ADD_MESSAGE,
    payload:response
})
