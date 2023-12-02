import React, { useState, useEffect } from "react";

function Node({ id, bank, selection }) {
    const parsedbank = bank
    const params = parsedbank
    const [bankdata, setbankdata] = useState({});
    const [splitvals, setsplitvals] = useState({});
    const [statresponse, setstatresponse] = useState(null);

    let offsetx = +params.posx1 * 20 + +window.innerWidth / 2;
    let offsety = +params.posy1 * 20 + +window.innerHeight / 2;

    const divStyle = {
        padding: "2px",
        position: "fixed",
        backgroundColor: "#" + params.color,
        top: offsety + "px",
        left: offsetx + "px",
        width: params.posx2 * 20 + "px",
        height: params.posy2 * 20 + "px",
        // Add any other styles as needed
    };

    //uh oh
    function iterate(obj, target) {
        for (const [key, val] of Object.entries(obj)) {
            if (key == target) {
                return (val)
            }
        }
    }

    fetch("/getbank/" + selection)
        .then(response => response.text())
        .then(data => {
            switch (params.type) {
                case "singlenumber":
                    const vals = params.inputs[0]
                    setsplitvals(vals)
                    setstatresponse(iterate(iterate(iterate(JSON.parse(data), splitvals[0]), splitvals[1]), splitvals[2])) //probably a danger zone
                    break;
            }

        })
        .catch(error => {
            console.error("Error fetching nodevalues:", error);
        });


    //const displaydata
    return (
        <div style={divStyle}>
            <p>bank: {selection}</p>
            <p>name: {params.name}</p>
            <p>team: {splitvals[0]}</p>
            <p>match: {splitvals[1]}</p>
            <p>stat: {splitvals[2]}</p>
            <p>statresponse: {statresponse}</p>
        </div>
    );
}

export default Node;