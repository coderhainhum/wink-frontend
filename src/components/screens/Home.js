import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import ConversationList from './ConversationList'
import MessageList from './MessageList/index'
import '../../App.css'
const Home =()=>{
    const history=useHistory()
    const[data,setData]=useState([])
    const[conversationId,setConversationId]=useState("")
    useEffect(()=>{
        fetch('/conversationList')
        .then(res=>res.json())
        .then(result=>{
            setData(result.result)
        })
    },[])

    


    return(
        <div className="messenger">
            <div className="scrollable sidebar">
            <ConversationList data={data} setConversationId={setConversationId}/>
            </div>
            <div className="scrollable content">
                <MessageList conversationId={conversationId} />
            </div>
        </div>
    )
}
export default Home;