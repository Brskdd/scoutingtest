import React, { useState, useEffect } from "react";

function SingleValue({ inputs, name }) {
    let val = String(inputs[0])
    const [actualthing, setactualthing] = useState("if you read this then the envvar fetch failed")
    const [output, setoutput] = useState("")
    useEffect(() => {

        setInterval(() => {
            if (val[0] === "$") {
                setoutput("/getnenvvar/" + val.slice(1))
                
                fetch("/getnenvvar/" + val.slice(1)).then(response => response.json()).then(data => {
                    setactualthing(data)
                    fetch("/writenenvvar/" + JSON.stringify([name,data]))
                })
            } else {
                setoutput("/getenvvar/" + val)
                //console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))
                fetch("/getenvvar/" + val).then(response => response.text()).then(data => {
                    console.log("envvar recieved " + data)
                    setactualthing(data)
                    console.log(data)
                })
            }
            //console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))
            
            
        }, 5000);


        /*setoutput(banktocheck + val)
        fetch(banktocheck + val)
            .then(response => response.json())
            .then(data => {
                console.log("raw data: " + data)
                const value = JSON.parse(data)
                setactualthing(value);
            })
            .catch(error => {
                console.error("Fetching envvars failed:", error);
            })*/
    }, []);

    /*useEffect(() => {
        console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))
        //update nennvar
        //fetch("/writenenvvar/" + JSON.stringify([name,actualthing]))
    },actualthing)*/

    return (
        <div>
            <p>Input: {val}</p>
            <p>Output: {actualthing}</p>
            
        </div>
    );
}

export default SingleValue;
