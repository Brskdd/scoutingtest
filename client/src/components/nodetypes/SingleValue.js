import React, { useState, useEffect } from "react";

function SingleValue({ inputs }) {
    const val = String(inputs[0])
    const [actualthing, setactualthing] = useState("if you read this then the envvar fetch failed")
    useEffect(() => {
        fetch("/getenvvar/" + val)
            .then(response => response.text())
            .then(data => {
                setactualthing(data)
            })
            .catch(error => {
                console.error("checking envvars did not work because aiden is a bad programmer:", error);
            });
        //ok so it gets an envar like 00590006TeleopHighCones find a way to get that key in the envvars for the bank
        
    },[])
    return (
        <div>
            <p>envvar input is {val}</p>
            <p>actual val is {actualthing}</p>
        </div>
    )
}
export default SingleValue