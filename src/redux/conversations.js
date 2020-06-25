import * as ActionTypes from './ActionTypes';

export const Conversations=(state={
    isLoading:true,
    errMess:null,
    conversations=[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_CONVERSATIONS:
            return {...state,isLoading:false,errMess:null,conversations:action.payload}
        case ActionTypes.CONVERSATIONS_LOADING:
            return {...state,isLoading:true, errMess:null, conversations:[]}
        case ActionTypes.CONVERSATION_FAILED:
            return {...state, isLoading:true, errMess:action.payload,conversations:[]}
    }
}