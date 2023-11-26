import React, { useState, useEffect } from "react";

function BankInput({onChange}) {
    const [inputbank, setinputbank] = useState("")

    const inputchanged = (event) => {
        setinputbank(event.target.value)
        onChange(event.target.value)
    }

    return (
        <input
            type="text"
            value={inputbank}
            onChange={inputchanged}
            placeholder="Select Bank"
        />
    )
}

export default BankInput;