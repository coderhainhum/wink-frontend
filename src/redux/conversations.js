import * as ActionTypes from './ActionTypes';
import { activeConversationId } from './ActionCreators';

export const Conversations=(state={
    isLoading:true,
    errMess:null,
    conversations:[],
    isActiveLoading:true,
    activeErrMess:null,
    activeConversationId:"",
    activeConversation:{},
    dumy:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_CONVERSATIONS:
            return {...state,isLoading:false,errMess:null,conversations:action.payload}
        case ActionTypes.CONVERSATIONS_LOADING:
            return {...state,isLoading:true, errMess:null, conversations:[]}
        case ActionTypes.CONVERSATION_FAILED:
            return {...state, isLoading:true, errMess:action.payload,conversations:[]}

        case ActionTypes.SET_ACTIVE_CONVERSATIONID:
            return {...state,activeConversationId:action.payload}

        case ActionTypes.SET_ACTIVE_CONVERSATION:
            let activeconversation=state.conversations.filter(conversation=>{
                let result=conversation._id==state.activeConversationId
                return result
            })
            activeconversation=activeconversation[0]
            if(activeconversation==undefined){
                activeconversation={}
            }
            return{...state,isActiveLoading:false,activeErrMess:null,activeConversation:activeconversation}
        case ActionTypes.ACTIVE_CONVERSATIONS_LOADING:
            return{...state,isActiveLoading:true,activeErrMess:null,activeConversation:{}}
        case ActionTypes.ACTIVE_CONVERSATION_FAILED:
            return{...state,isActiveLoading:true,activeErrMess:action.payload,activeConversation:{}}
        
        case ActionTypes.ADD_MESSAGE:
            // let dumb=action.payload
            // const messageBody={
            //     data:action.payload.data,
            //     senderId:action.payload.senderId,
            //     time:action.payload.time
            // }
            // let updation=state.conversations
            // for(var i=0;i<updation;i++){
            //     if(updation[i]._id==state.conversationId){    
            //         updation[i].messages.push(messageBody)
            //         dumb=updation[i].messages
            //     }
            // }
            let updation=state.conversations
            const objIndex = updation.findIndex((obj => obj._id == state.activeConversationId));
            let dumb=objIndex
            updation[objIndex]=action.payload
            return{...state,isLoading:false,errMess:null,conversations:updation,activeConversation:action.payload}
            //return{...state,dumy:updation}
        default:return state
    }
}