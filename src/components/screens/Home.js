import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import ConversationList from './ConversationList'
import MessageList from './MessageList/index'
import '../../App.css'


var socket;

const Home =({socket})=>{
    const ENDPOINT = 'http://localhost:5000/';
    
    // if(socket !== undefined){
    //     console.log('Connected to socket...');
    //     console.log(socket)
    // }
    
    const history=useHistory()
    const[data,setData]=useState([])
    const[conversationId,setConversationId]=useState([])
    useEffect(()=>{
        fetch('/conversationList')
        .then(res=>res.json())
        .then(result=>{
            setData(result.result)
        })
    },[conversationId])

    


    return(
        <div className="messenger">
            <div className="scrollable sidebar">
            <ConversationList data={data} setConversationId={setConversationId} setConversation={setData}/>
            </div>
            <div className="scrollable content">
                <MessageList conversationId={conversationId} socket={socket} setConversationId={setConversationId}/>
            </div>
        </div>
    )
}
export default Home;