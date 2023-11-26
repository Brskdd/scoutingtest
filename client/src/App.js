//import { response } from "express"
import React, { useEffect, useState } from "react"
import Node from "./components/Node.js"
let timespolled = 0;

function App() {
  const [bank, setbank] = useState(null)
  let selectedbank = "MatchBox"
  useEffect(() => {
    fetch("/getbank/" + selectedbank)
        .then(response => response.text())
        .then(data => {
            setbank(data);
        })
        .catch(error => {
            console.error("Error fetching nodevalues:", error);
        });

        //ok great so we are able to pull the formatted json do we want to say like since its matchbox do something
        //oh also can you create like a list of environment variables so the user sees them when they get a dropdown
        //gn cutie :3333 DONT FORGET ME TOMORROW
}, []);



  //create a nodemanager that FETCHes nodes.json and then iterates through the nodes to load them into the webpage

  return (
    <div>
      
      <Node id="1" name="appledisplay" type="singlenumber" posx1="0" posy1="0" posx2="15" posy2="5" color="ff0000" values="apples" />
      <Node id="2" name="orangedisplay" type="singlenumber" posx1="-2" posy1="6" posx2="8" posy2="8" color="ffff00" values="oranges" />
    </div>
  )

}
export default App