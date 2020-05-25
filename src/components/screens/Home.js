import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import ConversationList from './ConversationList'
import ConversationListItem from './ConversationListItem'

const Home =()=>{
    const history=useHistory()
    const[data,setData]=useState([])
    useEffect(()=>{
        fetch('/conversationList')
        .then(res=>res.json())
        .then(result=>{
            setData(result.result)
        })
    },[])

    return(
        <div>
            <div>
                <h1>Home</h1>
                <ConversationList data={data}/>
            </div>
        </div>
    )
}
export default Home;