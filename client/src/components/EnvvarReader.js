//so the way this guy should work is
//itll be created when the user hits some form for like enter new envvar
//and then some big list will come up
//searchable so like the list filters as you type what you want
//and then yoou select the envvar you want to read and then it returns it
//pretty easy stuff no actual reading the value of the envvar just getting the list of what we have and returning what is selected
import React, { useState, useEffect } from "react"

function EnvvarReader({ inputs, name }) {

    const [filter, setfilter] = useState()
    const [list, setlist] = useState([])

    useEffect(() => {
        //SAMPLE CODE FOR NOW IT NEEDS TO ACTUALLY DO ITS JOB
        setlist([
            "0005900006AutonomousChargeAttempt",
            "0005900006AutonomousChargeAttempt",
            "0005900006AutonomousEndOfAutonPos",
            "0005900006AutonomousHighCones",
            "0005900006AutonomousHighCubes"
        ])
    })

    function selected() {

    }
    return (
        <div className="fixed items-center justify-center top-1/4 left-1/3 w-1/3 h-2/3 border-4 rounded-2xl bg-gradient-to-b from-theme-backdrop to-theme-backdropdark bg-opacity-100 border-theme-tertiary justify-center z-10">
            <div className="m-4 bg-green-500 w-full h-1/2 block">
                {list.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div className="m-4 bg-green-500 block">
                <p>filter</p>
            </div>
            <div className="m-4 bottom-0 bg-green-500 block">
                <p>submit button submit</p>
            </div>
        </div>
    )
}

export default EnvvarReader