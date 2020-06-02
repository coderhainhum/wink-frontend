import React,{useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom'
import './ConversationSearch.css';
import M from 'materialize-css'

export default function ConversationSearch(props) {
    const setConversationId=props.setConversationId
    const setConversation=props.setConversation
    const searchModal=useRef(null);

    const [userDetails,setUserDetails]=useState([])
    const [search,setSearch]=useState('')

    useEffect(()=>{
      M.Modal.init(searchModal.current)
    })

    const fetchUsers=(query)=>{
      const user=JSON.parse(localStorage.getItem('user'))
      setSearch(query)  
      fetch('/searchUsers',{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              query,id:user._id
          })
      }).then(res=>res.json())
      .then(results=>{
          setUserDetails(results.user)
          setConversation([])
      })
  }

  const createConversation=(person1_id)=>{
    const user=JSON.parse(localStorage.getItem('user'))
    const person2_id=user._id
    fetch('/createConversation',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            person1:person1_id,
            person2:person2_id
        })
    }).then(res=>res.json())
    .then(conversationId=>{
        setSearch('')
        setUserDetails([])
        setConversationId(conversationId)
    })
}

    return (
      // <div>
      // <div className="conversation-search">
      //   <input
      //     type="search"
      //     className="conversation-search-input"
      //     placeholder="Search Messages"
      //     onChange={(e)=>fetchUsers(e.target.value)}
      //   />
      // </div>
      //       <ul class="collection">
      //     {userDetails.map(item=>{
      //         return <Link onClick={()=>{
      //             M.Modal.getInstance(searchModal.current).close()
      //             createConversation(item._id)
      //             setSearch('')
      //             setUserDetails([])
      //         }}><li className="collection-item">{item.username}</li></Link>
      //     })}
      // </ul>
      // </div>
      <div>
      <input
          type="text"
          placeholder="search users"
          value={search}
          onChange={(e)=>fetchUsers(e.target.value)}
          style={{border:"black"}}
      />
      <ul class="collection">
          {userDetails.map(item=>{
              return <Link onClick={()=>{
                  createConversation(item._id)
                  setSearch('')
                  setUserDetails([])
              }}><li className="conversation-list-item">
                    <img className="conversation-photo" src={item.photo} alt="conversation" />
                    <div className="conversation-info" >
                        <h1 className="conversation-title">{ item.name }</h1>
                    </div>  
                </li></Link>
          })}
      </ul>
  </div>

  
    );
}