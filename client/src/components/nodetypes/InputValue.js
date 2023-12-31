import React, { useState, useEffect } from "react";

function InputValue({ inputs, name }) {
    const [actualthing, setactualthing] = useState("")
    const changed = (event) => {
        setactualthing(event.target.value)
        fetch("/writenenvvar/" + JSON.stringify([name, [event.target.value]]))
    }
    return (
        <div>
            <p>enter val</p>
            <input onChange={changed} value={actualthing} type="text" className="rounded-md bg-theme-backdrop max-w-fit" />
            <p>sending {"/writenenvvar/" + JSON.stringify(name, [actualthing])}</p>
        </div>
    )
}
export default InputValue