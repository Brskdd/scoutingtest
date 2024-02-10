import React, { useState, useEffect } from "react"

function Logo() {
    
    return (
        <img src={process.env.PUBLIC_URL + "/logo.png"} style={{ height: "100%", position: "absolute", right: 0, top: 0 }} />
    )

}

export default Logo