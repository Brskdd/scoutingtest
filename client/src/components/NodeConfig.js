//what displays inside of a node when in config mode not view mode
//takes same inputs, its outputs are setting node envvars/nenvvars
//done by having input fields (EnvvarReader)
import React, { useState, useEffect } from "react"
import EnvvarReader from "./EnvvarReader"

function NodeConfig({ inputs, name }) {

    const [clicked, setclicked] = useState(false)

    function clickevent() {
        setclicked(!clicked)
    }

    return (
        <div>
            <p>{inputs}</p>
            <button onClick={clickevent}>press me to change input</button>
            {clicked && <EnvvarReader name={name}/>}
            <p>name: {name}</p>
            
        </div>
    )
}

export default NodeConfig