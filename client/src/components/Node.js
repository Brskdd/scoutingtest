import React, { useState, useEffect } from "react";

function Node({ id, bank }) {
    const parsedbank = bank
    const params = parsedbank

    let offsetx = +params.posx1*20 + +window.innerWidth / 2;
    let offsety = +params.posy1*20 + +window.innerHeight / 2;
    const divStyle = {
        position: "fixed",
        backgroundColor: "#" + params.color,
        top: offsety + "px",
        left: offsetx + "px",
        width: params.posx2*20 + "px",
        height: params.posy2*20 + "px",
        // Add any other styles as needed
    };

    return (
        <div style={divStyle}>
            <p>bank: {JSON.stringify(parsedbank)}</p>
            <p>id: {id}</p>
        </div>
    );
}

export default Node;