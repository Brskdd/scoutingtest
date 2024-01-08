import React, { useState, useEffect } from "react"
function DemoNode({ type, oncancel }) {
    const [size, setsize] = useState({
        x: 200,
        y: 100
    })

    const [pos, setpos] = useState({
        x: 0,
        y: 0
    })

    const [nodename, setnodename] = useState("null")
    const [nodecolor, setnodecolor] = useState("#ffffff")

    const scalehandle = (event) => {
        const startsize = size
        const startpos = {
            x: event.pageX,
            y: event.pageY
        }

        function moved(event) {
            setsize(current => ({
                x: startsize.x - startpos.x + event.pageX,
                y: startsize.y - startpos.y + event.pageY
            }))
        }

        function up() {
            document.body.removeEventListener("mousemove", moved)
        }

        document.body.addEventListener("mousemove", moved)
        document.body.addEventListener("mouseup", up, { once: true })
    }
    //need adjustable corners coloring confirm and cancel buttons

    const movehandle = (event) => {
        const startpos = {
            x: event.pageX,
            y: event.pageY
        }

        function moved(event) {
            setpos(current => ({
                x: event.pageX,
                y: event.pageY
            }))
        }

        function up() {
            document.body.removeEventListener("mousemove", moved)
        }

        document.body.addEventListener("mousemove", moved)
        document.body.addEventListener("mouseup", up, { once: true })
    }

    function confirm() {
        oncancel()
        console.log(nodecolor)
        const data = {
            x1: pos.x,
            y1: pos.y,
            x2: pos.x + size.x,
            y2: pos.y + size.y,
            name: nodename,
            color: nodecolor.slice(1),
            nodetype: type
        }
        console.log(JSON.stringify(data))
        fetch("/createnode/" + JSON.stringify(data))
        //send fetch to the server along with data
        //height is pixel val - 1/6 screen height r
    }


    return (
        <div className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-20">
            <div className="border-white border-2 flex flex-col" style={{
                width: Math.round(size.x / 20) * 20,
                height: Math.round(size.y / 20) * 20,
                position: "absolute",
                top: Math.round(pos.y / 20) * 20 + (window.innerHeight / 6) % 20 - 20,
                left: Math.round(pos.x / 20) * 20
            }}>
                <div className="m-8 flex-grow">
                    <label className="text-white">node color: </label>
                    <input type="color" value={nodecolor} onChange={(event) => setnodecolor(event.target.value)}/>
                    <br />
                    <label className="text-white">node name: </label>
                    <input type="text" value={nodename} onChange={(event) => setnodename(event.target.value)}/>
                </div>
                {/*actual content*/}

                <button onMouseDown={movehandle} style={{
                    position: "absolute",
                    top: 0,
                    left: 0
                }}>
                    <img draggable="false" src={process.env.PUBLIC_URL + "/pan.svg"} style={{
                        height: "30px",
                        minWidth: "30px",
                        minHeight: "30px"
                    }} />
                    {/*move button*/}
                </button>
                <button onMouseDown={scalehandle} style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0
                }}>
                    <img draggable="false" src={process.env.PUBLIC_URL + "/scale.svg"} style={{
                        height: "30px",
                        minWidth: "30px",
                        minHeight: "30px"
                    }} />
                    {/*resize button*/}
                </button>
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0
                }}>
                    <button onClick={confirm}>
                        <img draggable="false" src={process.env.PUBLIC_URL + "/check.svg"} style={{
                            height: "30px",
                            minWidth: "30px",
                            minHeight: "30px"
                        }} />
                        {/*resize button*/}
                    </button>
                    <button onClick={oncancel}>
                        <img draggable="false" src={process.env.PUBLIC_URL + "/x.svg"} style={{
                            height: "30px",
                            minWidth: "30px",
                            minHeight: "30px"
                        }} />
                        {/*resize button*/}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DemoNode