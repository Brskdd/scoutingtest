import React, { useState, useEffect, Suspense, lazy } from "react";

function Node({ id, bank, selection }) {
    const parsedbank = bank;
    const params = parsedbank;
    const [Data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/getbank/" + selection);
                const data = await response.text();
                const loadinfo = lazy(() => import("./nodetypes/" + params.type + ".js"));
                setData(() => loadinfo);
            } catch (error) {
                console.error("Error fetching nodevalues:", error);
            }
        };

        fetchData();
    }, [selection, params.type]);

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

    return (
        <div style={divStyle}>
            <p>bank: {selection}</p>
            <p>name: {params.name}</p>

            <Suspense fallback={<div>--Data Loading--</div>}>
                {Data && <Data inputs={params.inputs} />}
            </Suspense>
        </div>
    );
}

export default Node;
