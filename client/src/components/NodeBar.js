import React, { useState, useEffect } from "react";

function NodeBar() {
    const [mode, setmode] = useState("open") //once youre done change this to closed so its not open on startup
    function switchmode() {
        if (mode == "open") {
            setmode("closed")
        } else {
            setmode("open")
        }
    }
    return (
        <div className="p-4 fixed w-10 h-5/6 right-0 bottom-0 border-2 border-white">
            <p className="text-white">sidebar</p>
        </div>
    )
}

export default NodeBar