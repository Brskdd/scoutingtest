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


  //create a nodemanager that FETCHes nodes.json and then iterates through the nodes to load them into the webpage

  return (
    <div> 
      <Node id="1" name="appledisplay" type="singlenumber" posx1="0" posy1="0" posx2="15" posy2="5" color="ff0000" values="apples" />
      <Node id="2" name="orangedisplay" type="singlenumber" posx1="-2" posy1="6" posx2="8" posy2="8" color="ffff00" values="oranges" />
    </div>
  )

}
export default App