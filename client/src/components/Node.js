import React, { useState, useEffect, Suspense, lazy } from "react";

function Node({ id, bank, selection }) {
    const parsedbank = bank
    const params = parsedbank
    const [bankdata, setbankdata] = useState({});
    const [splitvals, setsplitvals] = useState({});
    const [statresponse, setstatresponse] = useState(null);
    const [Data, setData] = useState(null);

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

    //uh oh YEAH UH OH WAS RIGHT WHAT IS THE POINT BEHIND THIS FUNCTION
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
            const loadinfo = lazy(() => import("./nodetypes/" + params.type + ".js"))
            setData(() => loadinfo)

        })
        .catch(error => {
            console.error("Error fetching nodevalues:", error);
        });


    //const displaydata
    return (
        <div style={divStyle}>
            <p>bank: {selection}</p>
            <p>name: {params.name}</p>

            <Suspense fallback={
                <div>
                    --Data Loading--
                </div>
            }>
            {Data && <Data inputs={params.inputs} />}
            </Suspense>
        </div>
    );
}

export default Node;