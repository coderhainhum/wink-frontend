import React,{useState,useEffect,Component} from 'react'
import {Link,useHistory} from 'react-router-dom'
import ConversationList from './ConversationList'
import MessageList from './MessageList/index'
import '../../App.css'

import {
    fetchConversations,
    activeConversationId,
    newMessage
} from '../../redux/ActionCreators'

import {connect} from 'react-redux';


const mapStateToProps=state=>{
    return{
        conversations:state.conversations.conversations,
        activeConversation:state.conversations.activeConversation,
        conversationId:state.conversations.activeConversationId,      
    }
}

const mapDispatchToProps=dispatch=>({
    fetchConversations:()=>{dispatch(fetchConversations())},
    changeActiveConversationId:(conversationId)=>{dispatch(activeConversationId(conversationId))},
    newMessage:(messageBody)=>{dispatch(newMessage(messageBody))},
    newConversation:()=>{dispatch(fetchConversations())},

})

class Home extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchConversations();
    }
    render(){
        console.log("props",this.props.conversations)
        return(
            <div className="messenger">
             <div className="scrollable sidebar">
                <ConversationList conversations={this.props.conversations} 
                    changeActiveConversationId={this.props.changeActiveConversationId}
                    newConversation={this.props.newConversation}
                />
             </div>
             <div className="scrollable content">
                 <MessageList socket={this.props.socket}
                    activeConversation={this.props.activeConversation}
                 />
             </div>
         </div>
        )
    }
}

// const Home =({socket})=>{
//     const ENDPOINT = 'http://localhost:5000/';
//     const history=useHistory()
//     const[data,setData]=useState([])
//     const[conversationId,setConversationId]=useState("")
//     const user=JSON.parse(localStorage.getItem('user'))
//     useEffect(()=>{
        
//         if(user!=null){
//             fetch('/conversationList',{
//                 method:"post",
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify({
//                     id:user._id
//                 })
//             })
//             .then(res=>res.json())
//             .then(result=>{
//                 setData(result.result)
//             })   
//         }
//     },[conversationId])

    


//     return(
//         <div className="messenger">
//             <div className="scrollable sidebar">
//             <ConversationList data={data} setConversationId={setConversationId} setConversation={setData}/>
//             </div>
//             <div className="scrollable content">
//                 <MessageList conversationId={conversationId} socket={socket} setConversationId={setConversationId}/>
//             </div>
//         </div>
//     )
// }
export default (connect(mapStateToProps,mapDispatchToProps)(Home));