import React,{useEffect,useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import io from "socket.io-client";

var socket;
const Routing=()=>{
  const socket = io.connect('http://127.0.0.1:4000');
  const[conversationId,setConversationId]=useState("")
  const[data,setData]=useState([])
  socket.on('output',function(conversation,data){
        //alert(conversationId)
        // window.location.reload();
        // console.log("con",conversationId.conversationId)
        //setConversationId("")
        if(data!=null){
          setData(data.data)
        }
        //alert(data)
        setConversationId(conversation.conversationId);
    })

  const history=useHistory()
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))
    if(user){
      //history.push('/')
    }
    else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home socket={socket} conversationId={conversationId} setConversationId={setConversationId} conversation={data} setConversation={setData}/>
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}
function App() {
  return (

    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    
  );
}

export default App;
