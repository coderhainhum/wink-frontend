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
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json())
    .then(conversations=>dispatch(addConversations(conversations)))
}

export const conversationsLoading=()=>({
    type:ActionTypes.CONVERSATIONS_LOADING
})

export const conversationsFailed=()=>({
    type:ActionTypes.CONVERSATION_FAILED
})

export const addConversations=()=>({
    type:ActionTypes.ADD_CONVERSATIONS
})


