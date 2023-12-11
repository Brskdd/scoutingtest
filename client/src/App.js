//import { response } from "express"
import React, { useEffect, useState } from "react"
import Node from "./components/Node.js"
import NodeManager from "./components/NodeManager.js"
import BankInput from "./components/BankInput.js"
import ToggleMode from "./components/ToggleMode.js"
let timespolled = 0;
function App() {
  const [bank, setbank] = useState(null)
  const [nodebank, setnodebank] = useState(null)
  const [selectedbank, setselectedbank] = useState("...") // make sure to hook this up to a button to request
  useEffect(() => {
    fetch("/getnodebank/" + selectedbank)
      .then(response => response.text())
      .then(nodedata => {
        setnodebank(nodedata);
      })
      .catch(error => {
        console.error("Error fetching nodebankvalues:", error);
      });

    //ok great so we are able to pull the formatted json do we want to say like since its matchbox do something
    //oh also can you create like a list of environment variables so the user sees them when they get a dropdown
    //gn cutie :3333 DONT FORGET ME TOMORROW

  }, []);

  //create a nodemanager that FETCHes nodes.json and then iterates through the nodes to load them into the webpage

  const forwardselectedbank = (value) => {
    setselectedbank(value)
  }

  return (
    <div>
      <div className="h-full w-full fixed top-0 left-0 bg-gray-800 z-0">
        {/*nodes background*/}
      </div>
      <div className="h-40 w-full fixed top-0 left-0 bg-gray-800 z-0">
        {/*top bar*/}
      </div>
      <div className="relative z-10">
        <p>Selected bank is {selectedbank}</p>
        <BankInput onChange={forwardselectedbank} />
        <ToggleMode />
        <NodeManager bank={selectedbank} />
        <p>test</p>
      </div>

    </div>
  )

}
export default App