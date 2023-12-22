import React, { useState, useEffect } from "react";

function SingleValue({ inputs, name }) {
    let val = String(inputs[0])
    const [actualthing, setactualthing] = useState("if you read this then the envvar fetch failed")
    const [output, setoutput] = useState("")
    useEffect(() => {

        if (val[0] === "$") {
            setoutput("nenvar")
            fetch("/getnenvvar/" + val.slice(1)).then(response => response.json()).then(data => {
                setactualthing(data)
            })
        } else {
            setoutput("envar")
            fetch("/getenvvar/" + val).then(response => response.json()).then(data => {
                setactualthing(data)
            })
        }

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
    }, [val, name]);

    return (
        <div>
            <p>envvar input is {val}</p>
            <p>actual val is {actualthing}</p>
            <p>out {output}</p>
        </div>
    );
}

export default SingleValue;
