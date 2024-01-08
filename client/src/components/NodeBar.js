import React, { useState, useEffect } from "react";
import NodeLister from "./NodeLister";

function NodeBar() {
    const [mode, setmode] = useState("closed") //once youre done change this to closed so its not open on startup
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

        <div className="fixed h-5/6 bottom-0 right-0 flex" style={{
            width: divwidth
        }}>
            <button className="flex items-center justify-center rounded-tl-xl rounded-bl-xl bg-gradient-to-b from-theme-secondary to-theme-secondarydark" onClick={switchmode} style={{
                width: "50px"
            }}>
                <img src={process.env.PUBLIC_URL + "/" + direction + ".svg"} />
            </button>
            <div className="flex-1 bg-gradient-to-b from-theme-fill to-theme-filldark">
                {mode == "open" && <NodeLister />}
            </div>
        </div>
    )
}

export default NodeBar