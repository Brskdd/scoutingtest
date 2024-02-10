//so the way this guy should work is
//itll be created when the user hits some form for like enter new envvar
//and then some big list will come up
//searchable so like the list filters as you type what you want
//and then yoou select the envvar you want to read and then it returns it
//pretty easy stuff no actual reading the value of the envvar just getting the list of what we have and returning what is selected
import React, { useState, useEffect } from "react"

function EnvvarReader({ inputs, name }) {

    const [filter, setfilter] = useState("")
    const [envlist, setenvlist] = useState([])
    const [nenvlist, setnenvlist] = useState([])
    const [envlistfilter, setenvlistfilter] = useState([])
    const [nenvlistfilter, setnenvlistfilter] = useState([])

    useEffect(() => {
        fetch("/getenvkeys").then(response => response.json()).then(
            //data => setenvlist(JSON.parse(data))
            //data => console.log(data)
            data => {
                setenvlist(data)
                setenvlistfilter(data.filter(item => item.includes(filter)))
            }
        )
    }, [filter])
    useEffect(() => {
        fetch("/getnenvkeys").then(response => response.json()).then(
            //data => setenvlist(JSON.parse(data))
            //data => console.log(data)
            data => {
                setnenvlist(data)
                setnenvlistfilter(data.filter(item => item.includes(filter)))
            }
        )
    }, [filter])

    function selected() {
        const sending = {}
        sending[name] = [filter]
        //console.log("/writeinput/" + JSON.stringify(sending))
        fetch("/writeinput/" + JSON.stringify(sending))
    }

    return (
        <div className="fixed items-center justify-center top-1/4 left-1/3 w-1/3 h-2/3 border-4 rounded-2xl bg-gradient-to-b from-theme-backdrop to-theme-backdropdark bg-opacity-100 border-theme-tertiary z-10">
            <div className="flex flex-row h-full">
                <div className="m-4 bg-green-500 w-1/2 h-1/2 overflow-auto">
                    {envlistfilter.map((item, index) => (
                        <div>
                            <p key={index}>{item}</p>
                            <br />
                        </div>

                    ))}
                </div>
                <div className="m-4 bg-green-500 w-1/2 h-1/2 overflow-auto">
                    {nenvlistfilter.map((item, index) => (
                        <div>
                            <p key={index}>{item}</p>
                            <br />
                        </div>
                    ))}
                </div>
            </div>

            <div className="m-4 bg-green-500 block">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setfilter(e.target.value)}
                    placeholder="filter"
                    className="text-black"
                />
            </div>
            <div className="m-4 bg-green-500 block">
                <button onClick={selected}>submit</button>
            </div>
        </div>
    )
}

export default EnvvarReader