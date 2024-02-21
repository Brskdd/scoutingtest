import React, { useState, useEffect, Suspense, lazy } from "react";
import NodeConfig from "./NodeConfig";

function Node({ id, bank, selection, defaultteam }) {
    const parsedbank = bank;
    const params = parsedbank;
    const [Data, setData] = useState(null);
    const [displaymode, setdisplaymode] = useState("view")
    const [team, setteam] = useState()

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

    useEffect(() => {
        if (String(defaultteam).startsWith("frc")) {
            setteam(String(defaultteam).substring(3))
        } else {
            setteam(defaultteam)
        }
        
    }, [defaultteam])

    let offsetx = +params.posx1 * 20
    let offsety = +params.posy1 * 20 + window.innerHeight / 6

    function dark(input) {
        let r = Math.floor(parseInt(input.slice(0, 2), 16) * 0.3)
        let g = Math.floor(parseInt(input.slice(2, 4), 16) * 0.3)
        let b = Math.floor(parseInt(input.slice(4, 6), 16) * 0.3)
        const output = r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")
        return (output)
    }

    const divStyle = {
        margin: "0px",
        borderRadius: "15px",
        position: "fixed",
        padding: "3px",
        background: `linear-gradient(to bottom, #${params.color}, #${dark(params.color)})`,
        top: offsety + "px",
        left: offsetx + "px",
        width: params.posx2 * 20 + "px",
        height: params.posy2 * 20 + "px",
        display: "grid",
        placeItems: "center",
        zIndex: 1

        // Add any other styles as needed
    };

    return (
        <div style={divStyle} >
            <div className="bg-gradient-to-b from-theme-fill to-theme-filldark text-white p-2 rounded-xl opacity-90 w-full h-full overflow-auto break-words">
                {displaymode == "view" ? (
                    <Suspense fallback={<div>--Data Loading--</div>}>
                        {/*<p>{defaultteam} -- {team}</p>*/}
                        {Data && <Data inputs={params.inputs} name={params.name} team={team} />}
                        <input className="text-black" value={team} onChange={(e) => {
                            setteam(e.target.value)
                            console.log(e.target.value)
                            }}></input>
                    </Suspense>
                ) : (
                    <NodeConfig inputs={params.inputs} name={params.name} />
                )}

            </div>
            
        </div> //rn its "view mode" obv not final version but figure out config modes
    );
}

export default Node;
