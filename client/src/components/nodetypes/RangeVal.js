import React, { useState, useEffect } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

function RangeVal({ inputs, name }) {
    const val = inputs[0]
    //dumb for now
    const history = {
        "0": Math.random() * 100,
        "1": Math.random() * 100,
        "2": Math.random() * 100,
        "3": Math.random() * 100,
        "4": Math.random() * 100
    }
    const data = [
        {
            name: Object.keys(history)[0],
            value: history[0]
        },
        {
            name: Object.keys(history)[1],
            value: history[1]
        },
        {
            name: Object.keys(history)[2],
            value: history[2]
        },
        {
            name: Object.keys(history)[3],
            value: history[3]
        },
        {
            name: Object.keys(history)[4],
            value: history[4]
        }
    ]
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={200}
                height={200}
                data={data}
                margin={{
                    top: 5,
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
                <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}
export default RangeVal