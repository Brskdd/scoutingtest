import React, { useState, useEffect } from "react";
import Node from "./Node.js"

function NodeManager({ bank }) {
    //nodemanager that FETCHes nodes.json and then iterates through the nodes to load them into the webpage
    const [nodebank, setnodebank] = useState(null)
    useEffect(() => {
        fetch("/getnodebank/" + bank)
            .then(response => response.text())
            .then(nodedata => {
                setnodebank(nodedata);
            })
            .catch(error => {
                console.error("Error fetching nodebankvalues:", error);
            });

    }, [bank]);
    //get nodes for bank
    //for each id create a node with those params
    return (
        <div>
            {nodebank && Object.entries(JSON.parse(nodebank)).map(([key, val]) => (
                <Node key={key} id={key} bank={val} selection={bank} />
            ))}
        </div>
    )
}

export default NodeManager;