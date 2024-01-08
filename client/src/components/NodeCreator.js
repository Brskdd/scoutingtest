import React, { useState, useEffect } from "react"
import DemoNode from "./DemoNode"
function NodeCreator({ type }) {
    const [newguy, setnewguy] = useState(false)

    function createdemonode(param) {
        console.log(param)
        setnewguy(true)
    }

    function closedemonode() {
        console.log("cancel req")
        setnewguy(false)
    }

    return (
        <div>
            <div className="m-4 flex items-center justify-center rounded-lg bg-gradient-to-b from-theme-backdrop to-theme-backdropdark" onClick={() => createdemonode(type)}>
                <p className="text-white">
                    {type}
                </p>
            </div>
            {newguy && <DemoNode oncancel={closedemonode} type={type}/>}
        </div>

    )
}

export default NodeCreator