//import { response } from "express"
import React, { useEffect, useState } from "react"
import Node from "./components/Node.js"
import NodeManager from "./components/NodeManager.js"
import BankInput from "./components/BankInput.js"
import ToggleMode from "./components/ToggleMode.js"
import NodeBar from "./components/NodeBar.js"
import Logo from "./components/Logo.js"
let timespolled = 0;
function App() {
  const [eventkey, seteventkey] = useState("2024mimil")//UPDATE ME PER COMPETITION ESP CUZ RN ITS LAST YEARS 2023gal
  const [token, settoken] = useState("MIPsLEPwAhfTWlMwNaH4PoelxszYqwvkZxt5sv7MV46Hs5ASW7xAQFuUUi7612YK")//only reason to change this if i(aiden) got banned from tba api or smth
  const [match, setmatch] = useState("")
  const [schedule, setschedule] = useState({})
  const [bigdata, setbigdata] = useState()
  /*
  const [r1, setr1] = useState({})
  const [r2, setr2] = useState({})
  const [r3, setr3] = useState({})
  const [b1, setb1] = useState({})
  const [b2, setb2] = useState({})
  const [b3, setb3] = useState({})
*/

  const [rlineup, setrlineup] = useState([])
  const [blineup, setblineup] = useState([])

  useEffect(() => {
    fetch("https://www.thebluealliance.com/api/v3/event/" + eventkey + "/matches", {
      headers: {
        "X-TBA-Auth-Key": token // Replace with your API key
      }
    }).then(response => response.json())
      .then(data => {
        setbigdata(data)
        const scheduler = {}
        //console.log(JSON.stringify(data))
        //console log for each match its scheduled start time and teams competing
        data.forEach(match => {
          const matchTime = new Date(match.time * 1000) // Convert Unix timestamp to milliseconds
          const hours = matchTime.getHours()
          const minutes = matchTime.getMinutes()
          //console.log(`Match ${match.match_number}: Scheduled Time - ${hours}:${minutes}, Teams - ${match.alliances.red.team_keys.join(', ')} vs ${match.alliances.blue.team_keys.join(', ')}`);
          //console.log(match.match_number)
          scheduler[match.key] = match.time
          //console.log("piss" + JSON.stringify(match.alliances))
          //setrlineup(match.alliances.red.team_keys)
          //setblineup(match.alliances.blue.team_keys)
          //console.log("red " + match.alliances.red.team_keys)
          //console.log("blue " + match.alliances.blue.team_keys)

        })
        const schedarray = Object.entries(scheduler)
        schedarray.sort((i, j) => {
          return (i[1] - j[1])
        })
        const sortedscheduler = Object.fromEntries(schedarray)
        setschedule(sortedscheduler)
        //console.log(JSON.stringify(sortedscheduler))
      })
  }, [])

  useEffect(() => {
    console.log("newmatch " + match)
    if (bigdata) {
      const selectedmatch = bigdata.find(matchdata => matchdata.key === match)
      if (selectedmatch) {
        //console.log(selectedmatch)
        setrlineup(selectedmatch.alliances.red.team_keys)
        setblineup(selectedmatch.alliances.blue.team_keys)
        //console.log(selectedmatch.alliances.red.team_keys)
        //console.log(selectedmatch.alliances.blue.team_keys)
      }
    }

  }, [match])

  function refreshfirebasebutcool() {
    fetch("/refreshfirebase")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-1/6 w-full fixed top-0 left-0 bg-theme-primary z-0 flex justify-between items-center">
        {/*top bar*/}
        <select onChange={(e) => setmatch(e.target.value)} className="m-4">
          <option value="">Select a match</option>
          {Object.entries(schedule).map(([matchId, matchTime]) => (
            <option key={matchId} value={matchId}>
              {matchId} - {new Date(matchTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </option>
          ))}
        </select>
        <button className="text-white" onClick={refreshfirebasebutcool}>Refresh Firebase</button>
        <img src={process.env.PUBLIC_URL + "/hotlogo.webp"} style={{ height: "100%" }} />
        <Logo />
      </div>
      <div className="fixed w-full h-5/6 bottom-0 bg-gradient-to-b from-theme-backdrop to-theme-backdropdark">
        <p>Made with &lt;3 by Aiden Zemblaku 2023-2024</p>
        <div className="p-4 h-full w-full">
          <NodeManager bank={"MatchBox"} reds={rlineup} blues={blineup} />
        </div>

      </div>
    </div>
  )

}
export default App