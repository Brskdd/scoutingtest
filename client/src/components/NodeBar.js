import React, { useState, useEffect } from "react";

function NodeBar() {
    const [mode, setmode] = useState("open") //once youre done change this to closed so its not open on startup
    const [divwidth, setdivwidth] = useState("50px")
    let styledata= {
        width: divwidth
    }
    function switchmode() {
        
        if (mode == "open") {
            setmode("closed") 
            setdivwidth("50px")
        } else {
            setmode("open")
            setdivwidth("300px")
        }
    }
    
    
    return (
        
        <div className="p-4 fixed h-5/6 bottom-0 border-2 border-white right-0" onClick={switchmode} style={styledata}>
            <p className="text-white">sidebar</p>
        </div>
    )
}

export default NodeBar