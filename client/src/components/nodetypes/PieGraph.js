import React, { useState, useEffect } from "react";
//RIGHT NOW ITS ONLY SUPPORTING 2 VALUES IN THE FUTURE DIVIDE THE PIE AS MUCH AS NEEDED
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"


function PieGraph({ inputs, name }) {
    let val1 = String(inputs[0])
    let val2 = String(inputs[1])
    const [actual1, setactual1] = useState("")
    const [actual2, setactual2] = useState("")
    useEffect(() => {

        setInterval(() => {
            if (val1[0] === "$") {
                //setoutput("/getnenvvar/" + val1.slice(1))

                fetch("/getnenvvar/" + val1.slice(1)).then(response => response.json()).then(data => {
                    setactual1(parseInt(data))
                    fetch("/writenenvvar/" + JSON.stringify([name, data]))
                })
            } else {
                //setoutput("/getenvvar/" + val1)
                //console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))
                fetch("/getenvvar/" + val1).then(response => response.text()).then(data => {
                    console.log("actual1 " + data)
                    setactual1(parseInt(data))
                    console.log(data)
                })
            }
            //console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))

            if (val2[0] === "$") {
                //setoutput("/getnenvvar/" + val2.slice(1))

                fetch("/getnenvvar/" + val2.slice(1)).then(response => response.json()).then(data => {
                    setactual2(parseInt(data))
                    fetch("/writenenvvar/" + JSON.stringify([name, data]))
                })
            } else {
                //setoutput("/getenvvar/" + val2)
                //console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))
                fetch("/getenvvar/" + val2).then(response => response.text()).then(data => {
                    console.log("actual2 " + data)
                    setactual2(parseInt(data))
                    console.log(data)
                })
            }
            //console.log("/writenenvvar/" + JSON.stringify([name,actualthing]))

        }, 5000);
    }, []);

    if (actual1 !== "" && actual2 !== "") {
        const slices = [
            { name: "Cubes", value: actual1 },
            { name: "Cones", value: actual2 }
        ];

        const colors = ["#ff0000", "#0000ff"];

        return (
            <div className="bg-theme-tertiary">
                <PieChart width={400} height={400}>
                    <Pie
                        data={slices}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {slices.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        )
    } else {
        // Return a loading indicator or placeholder if actual1 and actual2 are empty strings
        return <div>Loading...</div>
    }
}

export default PieGraph
