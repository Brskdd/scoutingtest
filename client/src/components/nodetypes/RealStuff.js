import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import BowlingResult from "./BowlingResult";

function RealStuff({ inputs, name, team }) {
    const COLORS = ["#FF5733", "#C70039", "#900C3F"]
    const [piesize, setpiesize] = useState(120)
    const [barheight, setbarheight] = useState(120)
    const [barwidth, setbarwidth] = useState(60)
    const [barmargin, setbarmargin] = useState(20)

    useEffect(() => {
        if (window.innerHeight > window.innerWidth) {
            setpiesize(80)
            setbarheight(80)
            setbarwidth(30)
            setbarmargin(10)
        } else {
            setpiesize(120)
            setbarheight(120)
            setbarwidth(60)
            setbarmargin(20)
        }
    }, [window.innerHeight, window.innerWidth])

    const [autodata, setautodata] = useState([
        {
            name: 'AUTO',
            low: 1,
            avg: 1.5,
            high: 2
        }
    ])
    const [tspeaker, settspeaker] = useState([
        {
            name: 'SPKR',
            low: 1,
            avg: 2,
            high: 3,
        }
    ])
    const [tamp, settamp] = useState([
        {
            name: 'AMP',
            low: 1,
            avg: 2,
            high: 3,
        }
    ])
    const [climb, setclimb] = useState([[
        {
            name: 'CLMB',
            low: 1,
            avg: 2,
            high: 3,
        }
    ]])
    const [trap, settrap] = useState([
        {
            name: 'TRAP',
            low: 1,
            avg: 2,
            high: 3,
        }
    ])
    const [startpos, setstartpos] = useState([
        {
            name: 'SPOS',
            low: 1,
            avg: 2,
            high: 3,
        }
    ])

    useEffect(() => {
        //console.log(`/getstat/["${team}","Auton High Cones"]`)
        fetch(`/getstat/["${team}","Auton Speaker Made"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            console.log("Auton Speaker stuff " + JSON.stringify(values))
            const low = isFinite(Math.min(...values)) ? Math.min(...values) : 0
            const high = isFinite(Math.max(...values)) ? Math.max(...values) : 0
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = values.length > 0 ? Math.round((sum / values.length) * 10) / 10 : 0
            setautodata([
                {
                    name: 'AUTO',
                    low: low,
                    avg: average - low,
                    high: high - average,
                }
            ])
        })
        fetch(`/getstat/["${team}","Teleop Speaker Made"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = isFinite(Math.min(...values)) ? Math.min(...values) : 0
            const high = isFinite(Math.max(...values)) ? Math.max(...values) : 0
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = values.length > 0 ? Math.round((sum / values.length) * 10) / 10 : 0
            settspeaker([
                {
                    name: 'SPKR',
                    low: low,
                    avg: average - low,
                    high: high - average,
                }
            ])
        })
        fetch(`/getstat/["${team}","Teleop Amps"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = isFinite(Math.min(...values)) ? Math.min(...values) : 0
            const high = isFinite(Math.max(...values)) ? Math.max(...values) : 0
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = values.length > 0 ? Math.round((sum / values.length) * 10) / 10 : 0
            settamp([
                {
                    name: 'AMP',
                    low: low,
                    avg: average - low,
                    high: high - average,
                }
            ])
        })
        fetch(`/getstat/["${team}","Endgame Climb Attempt"]`).then(response => response.json()).then(data => {
            const values = data.map(item => (item === "true" ? true : false))
            const returning = values.map((bool, index) => ({
                name: `m${index + 1}`,
                val: bool ? 1 : 0,
            }))
            //console.log(returning)
            setclimb(returning)
        })
        fetch(`/getstat/["${team}","Endgame Trap Note"]`).then(response => response.json()).then(data => {
            const values = data.map(item => (item === "true" ? true : false))
            const returning = values.map((bool, index) => ({
                name: `m${index + 1}`,
                val: bool ? 1 : 0,
            }))
            //console.log(values)
            settrap(returning)
        })
        fetch(`/getstat/["${team}","Auton Start Pose"]`).then(response => response.json()).then(data => {
            const values = data
            const counts = values.reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1
                return acc
            }, {})
            const returning = Object.entries(counts).map(([name, value]) => ({
                name: name[0],
                value,
            }))
            //console.log("zzzzzzz" + JSON.stringify(returning))
            setstartpos(returning)
        })
        //console.log("qiqiqijoppqqpqpwpqp" + JSON.stringify(startpos))

    }, [team])

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip p-2 bg-white border border-gray-300 shadow-md">
                    <p className="text-sm text-gray-700">Low: {payload[0].value}</p>
                    <p className="text-sm text-gray-700">Avg: {payload[0].value + payload[1].value}</p>
                    <p className="text-sm text-gray-700">High: {payload[0].value + payload[1].value + payload[2].value}</p>
                </div>
            );
        }

        return null
    }

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* Bowling Results component in the top left */}
            <div style={{ position: "absolute", top: 0, left: 0 }}>
                Climb <BowlingResult list={climb} />
                Trap <BowlingResult list={trap} />
            </div>

            {/* PieChart component in the center */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <p>{startpos.map(item => `${item.name}${item.value}`).join(' ')}</p>
                    
                    <PieChart width={piesize} height={piesize}>
                        <Pie
                            data={startpos}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={startpos/2 - 10}
                            fill="#ff0000"
                        >
                            {startpos.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
            </div>

            {/* BarCharts on the right */}
            <div style={{ display: "flex", position: "absolute", right: "0px" }}>
                <div style={{ flex: "1" }}>
                    <p style={{ width: barmargin + "px" }}>AU</p>
                    <BarChart
                        width={barwidth}
                        height={barheight}
                        data={autodata}
                        margin={{
                            top: 0,
                            right: barmargin,
                            left: barmargin,
                            bottom: 0,
                        }}
                    >
                        <Tooltip content={customTooltip} />

                        <Bar dataKey="low" stackId="a" fill="#ff0000" label={{ position: "insideBottom", fill: "#ffffff" }} />
                        <Bar dataKey="avg" stackId="a" fill="#00ff00" label={{ position: "insideBottom", fill: "#ffffff" }} />
                        <Bar dataKey="high" stackId="a" fill="#0000ff" label={{ position: "insideBottom", fill: "#ffffff" }} />
                    </BarChart>
                </div>
                <div style={{ flex: "1" }}>
                <p style={{ width: barmargin + "px" }}>SP</p>
                    <BarChart
                        width={barwidth}
                        height={barheight}
                        data={tspeaker}
                        margin={{
                            top: 0,
                            right: barmargin,
                            left: barmargin,
                            bottom: 0,
                        }}
                    >
                        <Tooltip content={customTooltip} />
                        <Bar dataKey="low" stackId="a" fill="#ff0000" label={{ position: "insideBottom", fill: "#ffffff" }} />
                        <Bar dataKey="avg" stackId="a" fill="#00ff00" label={{ position: "insideBottom", fill: "#ffffff" }} />
                        <Bar dataKey="high" stackId="a" fill="#0000ff" label={{ position: "insideBottom", fill: "#ffffff" }} />
                    </BarChart>
                </div>
                <div style={{ flex: "1" }}>
                    <p style={{ width: barmargin + "px" }}>AM</p>
                    <BarChart
                        width={barwidth}
                        height={barheight}
                        data={tamp}
                        margin={{
                            top: 0,
                            right: barmargin,
                            left: barmargin,
                            bottom: 0,
                        }}
                    >
                        <Tooltip content={customTooltip} />
                        <Bar dataKey="low" stackId="a" fill="#ff0000" label={{ position: "insideBottom", fill: "#ffffff" }} />
                        <Bar dataKey="avg" stackId="a" fill="#00ff00" label={{ position: "insideBottom", fill: "#ffffff" }} />
                        <Bar dataKey="high" stackId="a" fill="#0000ff" label={{ position: "insideBottom", fill: "#ffffff" }} />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default RealStuff