import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';



const Routing=()=>{
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
        <Home />
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
