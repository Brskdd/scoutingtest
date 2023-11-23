//import { response } from "express"
import React, { useEffect, useState } from "react"
import Node from "./components/Node.js"
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
      
      <Node val="apples" />
    </div>
  )

}
export default App