//import { response } from "express"
import React, { useEffect, useState } from "react"
let timespolled = 0;
function App() {
  
  const [backenddata, setbackenddata] = useState("")

  useEffect(() => {
    const fetchdata = setInterval(() => {
    fetch("/api").then(
      response => response.text()
    ).then(
      data => {
        setbackenddata(data);
        timespolled += 1;
      }
    )
    }, 1000);
    return () => clearInterval(fetchdata)
  }, [])

  return (
    <div>
      <p>{backenddata}</p>
      <p>times polled: {timespolled}</p>
    </div>
  ) 

  
}
export default App