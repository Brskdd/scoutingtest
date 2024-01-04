import React, { useState, useEffect } from "react";

function NodeLister() {

    /*useEffect(() => {

    },[])*/
    let nodes = ["inputvalue", "piechart", "etc"]


    //go get a list of all the node types and display for now
    //the node creator will handle the being clicked on and making the node stuff
    return (
        <div>
            {nodes.map((item) => (
                <div>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    )
}

export default NodeLister