import React, { useState, useEffect } from "react";

function InputValue({ inputs }) {
    const [actualthing, setactualthing] = useState("")

    const changed = (event) => {
        setactualthing(event.target.value)
    }
    return (
        <div>
            <p>enter val</p>
            <input onChange={changed} value={actualthing} type="text" className="rounded-md bg-theme-backdrop max-w-fit"/>
        </div>
    )
}
export default InputValue