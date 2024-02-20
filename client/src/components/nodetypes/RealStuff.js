import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

function RealStuff({ inputs, name, team }) {
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
            name: 'T.SPKR',
            low: 1,
            avg: 2,
            high: 3,
        }
    ])
    const [tamp, settamp] = useState([
        {
            name: 'T.AMP',
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
        fetch(`/getstat/["${team}","Autonomous High Cones"]`).then(response => response.json()).then(data => {
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
                    high: high - average - low,
                }
            ])
        })
        fetch(`/getstat/["${team}","Teleop Med Cones"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = Math.min(...values)
            const high = Math.max(...values)
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = sum / values.length
            settspeaker([
                {
                    name: 'AUTO',
                    low: low,
                    avg: average - low,
                    high: high - average - low,
                }
            ])
        })
        fetch(`/getstat/["${team}","Teleop Med Cubes"]`).then(response => response.json()).then(data => {
            const values = data.map(num => parseInt(num, 10))
            //console.log(values)
            const low = Math.min(...values)
            const high = Math.max(...values)
            const sum = values.reduce((acc, curr) => acc + curr, 0)
            const average = sum / values.length
            settamp([
                {
                    name: 'AUTO',
                    low: low,
                    avg: average - low,
                    high: high - average - low,
                }
            ])
        })
        fetch(`/getstat/["${team}","Endgame Charge Attempt"]`).then(response => response.json()).then(data => {
            const values = data.map(item => (item === "true" ? true : false))
            const returning = values.map((bool, index) => ({
                name: `m${index + 1}`,
                val: bool ? 1 : 10,
            }))
            //console.log(returning)
            setclimb(returning)
        })
        fetch(`/getstat/["${team}","Endgame Defended Against"]`).then(response => response.json()).then(data => {
            const values = data.map(item => (item === "true" ? true : false))
            const returning = values.map((bool, index) => ({
                name: `m${index + 1}`,
                val: bool ? 1 : 10,
            }))
            //console.log(values)
            settrap(returning)
        })
        fetch(`/getstat/["${team}","Autonomous Starting Position"]`).then(response => response.json()).then(data => {
            const values = data
            const counts = values.reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1
                return acc
            }, {})
            const returning = Object.entries(counts).map(([name, value]) => ({
                name,
                value,
            }))
            console.log(returning)
            setstartpos(returning)
        })

    }, [team])

    return (
        <div>
            <BarChart
                width={150}
                height={200}
                data={autodata}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="low" stackId="a" fill="#8884d8" />
                <Bar dataKey="avg" stackId="a" fill="#82ca9d" />
                <Bar dataKey="high" stackId="a" fill="#aaaaaa" />
            </BarChart>
        </div>
    )
}

export default RealStuff