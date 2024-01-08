import React, { useState, useEffect } from "react"
import NodeCreator from "./NodeCreator"

function NodeLister() {
    const [nodes, setnodes] = useState([])
    useEffect(() => {
        fetch("/getnodetypes")
            .then(response => response.json())
            .then(data => {
                setnodes(data)
            })
            .catch(error => {
                console.error("error - ", error)
            })
    }, [])

    //go get a list of all the node types and display for now
    //the node creator will handle the being clicked on and making the node stuff
    return (
        <div>
            {nodes.map((item, key) => (
                <NodeCreator type={item} />
            ))}
        </div>
    )
}

export default NodeLister