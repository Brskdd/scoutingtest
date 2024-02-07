import React, { useState, useEffect } from "react";

function ToggleMode() {
    const [mode, setmode] = useState("view")
    function switchmode() {
        
        if (mode == "view") {
            setmode("config")
            console.log("setting config")
            fetch("/setmode/config")
        } else {
            setmode("view")
            console.log("setting view")
            fetch("/setmode/view")
        }
        
    }
    return (
        <button className="bg-theme-secondary fixed bottom-10 left-10 w-20 h-20 rounded-full p-4 shadow-md shadow-theme-secondary active:translate-y-1 active:bg-theme-secondarydark active:shadow-lg active:shadow-theme-secondarydark" onClick={switchmode}>
            <img src={process.env.PUBLIC_URL + "/" + mode + ".svg"} />
        </button>
    )
}

export default ToggleMode