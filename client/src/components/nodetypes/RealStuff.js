import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import BowlingResult from "./BowlingResult";

function RealStuff({ inputs, name, team }) {
    const COLORS = ["#FF5733", "#C70039", "#900C3F"]

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
        fetch(`/getstat/["${team}","Auton Speaker"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = Math.min(...values)
            const high = Math.max(...values)
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = sum / values.length
            setautodata([
                {
                    name: 'AUTO',
                    low: low,
                    avg: average - low,
                    high: high - average,
                }
            ])
        })
        fetch(`/getstat/["${team}","Teleop Speaker"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = Math.min(...values)
            const high = Math.max(...values)
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = sum / values.length
            settspeaker([
                {
                    name: 'SPKR',
                    low: low,
                    avg: average,
                    high: high,
                }
            ])
        })
        fetch(`/getstat/["${team}","Teleop Amp"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = Math.min(...values)
            const high = Math.max(...values)
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = sum / values.length
            settamp([
                {
                    name: 'AMP',
                    low: low,
                    avg: average,
                    high: high,
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
                name,
                value,
            }))
            //console.log(returning)
            setstartpos(returning)
        })

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: "1" }}>
                {/* Bowling Results component in the bottom left */}
                Climb <BowlingResult list={climb} />
                Trap <BowlingResult list={trap} />
            </div>
            <div style={{ flex: "1" }}>
                {/* PieChart component in the bottom right */}
                <PieChart width={150} height={180}>
                    <Pie
                        data={startpos}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#ff0000"
                    >
                        {startpos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div style={{ display: "flex"}}>
                <div style={{ flex: "1" }}>
                    <p>AUTON</p>
                    <BarChart
                        width={60}
                        height={150}
                        data={autodata}
                        margin={{
                            top: 0,
                            right: 20,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <Tooltip content={customTooltip} />
                        <Bar dataKey="low" stackId="a" fill="#ff0000" />
                        <Bar dataKey="avg" stackId="a" fill="#00ff00" />
                        <Bar dataKey="high" stackId="a" fill="#0000ff" />
                    </BarChart>
                </div>
                <div style={{ flex: "1" }}>
                    <p>SPKR</p>
                    <BarChart
                        width={60}
                        height={150}
                        data={tspeaker}
                        margin={{
                            top: 0,
                            right: 20,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <Tooltip content={customTooltip} />
                        <Bar dataKey="low" stackId="a" fill="#ff0000" />
                        <Bar dataKey="avg" stackId="a" fill="#00ff00" />
                        <Bar dataKey="high" stackId="a" fill="#0000ff" />
                    </BarChart>
                </div>
                <div style={{ flex: "1" }}>
                    <p>AMP</p>
                    <BarChart
                        width={60}
                        height={150}
                        data={tamp}
                        margin={{
                            top: 0,
                            right: 20,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <Tooltip content={customTooltip} />
                        <Bar dataKey="low" stackId="a" fill="#ff0000" />
                        <Bar dataKey="avg" stackId="a" fill="#00ff00" />
                        <Bar dataKey="high" stackId="a" fill="#0000ff" />
                    </BarChart>
                </div>
            </div>


        </div>
    )
}

export default RealStuff