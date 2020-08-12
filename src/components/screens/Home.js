import React,{useState,useEffect,Component} from 'react'
import {Link,useHistory} from 'react-router-dom'
import ConversationList from './ConversationList'
import MessageList from './MessageList/index'
import '../../App.css'

import {
    fetchConversations,
    activeConversationId,
    newMessage,
    activeConversation,
} from '../../redux/ActionCreators'

import {connect} from 'react-redux';


const mapStateToProps=state=>{
    return{
        conversationsData:state.conversations,
        conversationId:state.conversations.activeConversationId,
    }
}

const mapDispatchToProps=dispatch=>({
    fetchConversations:()=>{dispatch(fetchConversations())},
    changeActiveConversationId:(conversationId)=>{dispatch(activeConversationId(conversationId))},
    newMessage:(messageBody)=>{dispatch(newMessage(messageBody))},
    newConversation:()=>{dispatch(fetchConversations())},
    changeActiveConversation:()=>{dispatch(activeConversation())}
})
const user=localStorage.getItem('user')
class Home extends Component{
    
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.props.fetchConversations();
    }
    render(){
        const socket=this.props.socket;
        const a=this.props.fetchConversations
        const b=this.props.changeActiveConversation
        socket.on('output',function(){
            console.log("done")
            a()
            b()
          })
        console.log("props",this.props)
        return(
            <>
            {user?
            <div className="messenger">
            <div className="scrollable sidebar">
               <ConversationList conversationsData={this.props.conversationsData} 
                   changeActiveConversationId={this.props.changeActiveConversationId}
                   changeActiveConversation={this.props.changeActiveConversation}
                   newConversation={this.props.newConversation}
               />
            </div>
            <div className="scrollable content">
                <MessageList socket={this.props.socket}
                   conversationsData={this.props.conversationsData}
                   changeActiveConversation={this.props.changeActiveConversation}
                   newMessage={this.props.newMessage}
                   conversationId={this.props.conversationId}
                   fetchConversations={this.props.fetchConversations}
                />
            </div>
        </div>
        :
        <div></div>
            }
            
         </>
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