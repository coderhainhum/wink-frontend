import * as ActionTypes from './ActionTypes';

export const Conversations=(state={
    isLoading:true,
    errMess:null,
    conversations=[],
    isActiveLoading:true,
    activeErrMess:null,
    activeConversation={}
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_CONVERSATIONS:
            return {...state,isLoading:false,errMess:null,conversations:action.payload}
        case ActionTypes.CONVERSATIONS_LOADING:
            return {...state,isLoading:true, errMess:null, conversations:[]}
        case ActionTypes.CONVERSATION_FAILED:
            return {...state, isLoading:true, errMess:action.payload,conversations:[]}
        case ActionTypes.SET_ACTIVE_CONVERSATION:
            let activeconversation=conversations.filter(conversation=>{
                let result=conversation._id==action.payload
                return result
            })
            activeconversation=activeconversation[0]
            return{...state,isActiveLoading:false,activeErrMess:null,activeConversation:activeconversation}
        case ActionTypes.ACTIVE_CONVERSATIONS_LOADING:
            return{...state,isActiveLoading:true,activeErrMess:null,activeConversation:{}}
        case ActionTypes.ACTIVE_CONVERSATION_FAILED:
            return{...state,isActiveLoading:true,activeErrMess:action.payload,activeConversation:{}}

    }
}