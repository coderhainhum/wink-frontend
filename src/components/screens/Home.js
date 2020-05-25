import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
const Home =()=>{
    const history=useHistory()
    const[data,setData]=useState([])
    useEffect(()=>{
        fetch('/conversationList')
        .then(res=>res.json())
        .then(result=>{
            setData(result.result)
            console.log(result.result)
        })
    },[])

    return(
        <div>
            <h1>Home</h1>
            {
                data.map(item=>{
                    return(
                    <div key={item._id}></div>
                    )
                })
            }
        </div>
    )
}
export default Home;