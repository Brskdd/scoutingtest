//import { response } from "express"
import React, { useEffect, useState } from "react"
import Node from "./components/Node.js"
import NodeManager from "./components/NodeManager.js"
import BankInput from "./components/BankInput.js"
let timespolled = 0;

function App() {
  const [bank, setbank] = useState(null)
  const [nodebank, setnodebank] = useState(null)
  const [selectedbank, setselectedbank] = useState("a") // make sure to hook this up to a button to request
  useEffect(() => {
    fetch("/getnodebank/" + selectedbank)
        .then(response => response.text())
        .then(nodedata => {
            setnodebank(nodedata);
        })
        .catch(error => {
            console.error("Error fetching nodebankvalues:", error);
        });

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

  const forwardselectedbank = (value) => {
    setselectedbank(value)
  }

  return (
    <div>
      <p>Selected bank is {selectedbank}</p>
      <BankInput onChange={forwardselectedbank}/>
      <NodeManager bank={selectedbank} />
    </div>
  )

}
export default App