import React, { useState, useEffect } from "react";
import NodeLister from "./NodeLister";

function NodeBar() {
    const [mode, setmode] = useState("open") //once youre done change this to closed so its not open on startup
    const [direction, setdirection] = useState("chevronleft")
    const [divwidth, setdivwidth] = useState("50px")
    function switchmode() {

        if (mode == "open") {
            setmode("closed")
            setdivwidth("50px")
            setdirection("chevronleft")
        } else {
            setmode("open")
            setdivwidth("300px")
            setdirection("chevronright")
        }
    }



    return (

        <div className="fixed h-5/6 bottom-0 border-2 border-white right-0 flex" onClick={switchmode} style={{
            width: divwidth
        }}>
            <div className="bg-theme-secondary flex items-center justify-center rounded-tl-xl rounded-bl-xl" style={{
                width: "50px"
            }}>
                <img src={process.env.PUBLIC_URL + "/" + direction + ".svg"} />
            </div>
            <div className="flex-1 bg-gradient-to-b from-theme-fill to-theme-filldark">
                <NodeLister/>
            </div>
        </div>
    )
}

export default NodeBar