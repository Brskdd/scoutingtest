import React, { useState, useEffect } from "react";

function ToggleMode() {
    const [mode, setmode] = useState("view")
    function switchmode() {
        if (mode == "view") {
            setmode("config")
        } else {
            setmode("view")
        }
    }
    return (
        <button className="bg-gray-600 fixed bottom-10 left-10 w-20 h-20 rounded-full p-4" onClick={switchmode}>
            <img style={{ filter: "invert(1)" }} src={process.env.PUBLIC_URL + "/" + mode + ".svg"} />
        </button>
    )
}

export default ToggleMode