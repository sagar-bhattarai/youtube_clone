import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  const [naman, setNaman] = useState()
  useEffect(()=>{
      axios.get('/api/')
      .then((response)=>{
        setNaman(response?.data)
      }).catch((error)=>{
        console.log('error',error)
      })
  },[])
  return (
      <div className="app_body">
        <h1>{naman?.parent}</h1>
        <h2>{naman?.god}</h2>
      </div>
  );
}

export default App;
