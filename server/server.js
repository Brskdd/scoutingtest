const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const admin = require("firebase-admin")
const bodyParse = require("body-parser")


let globalbank = "MatchBox" //FIGURE OUT A WAY TO CONFIG THIS
let randvar = 100;
let mode = "view"

const acct = require("../key.json")
let database



/*admin.initializeApp({
    credential: admin.credential.cert(acct),
    databaseURL: "https://hot-scouting-default-rtdb.firebaseio.com" //2024 https://hot-scouting-default-rtdb.firebaseio.com ---old testing https://sheet-import-test-c264f-default-rtdb.firebaseio.com
})
console.log("admin " + JSON.stringify(admin.credential))
database = admin.database()
console.log("admin init")

const datapath = "/" + "2024test" //2024 is 2024test old is 2023Worlds
const datareference = database.ref(datapath)

function grabfirebase() {
    datareference.once("value", (snapshot) => {
        const data = snapshot.val()
        const newdata = {}
        Object.entries(data).forEach(([key, val]) => {
            const [match, team] = key.split("_");
            if (!newdata[team]) {
                newdata[team] = {}
            }
            newdata[team][match] = val
            console.log(newdata[team][match] + " is " + val)
        });
        fs.writeFile("../banks/" + globalbank + "/data.json", JSON.stringify(newdata, null, 2), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Data successfully written to file.")
            }
        })
    })
}

// Call the function to fetch data from Firebase when the server starts
grabfirebase()*/


const loader = require("../banks/" + globalbank + "/loader.js")

function randtherandvar() {
    randvar = Math.floor((Math.random()) * 100)
}
const runtherandtherandvar = setInterval(randtherandvar, 2000);

app.get("/api", (req, res) => {
    res.send(randvar.toString())
    refacc("0005900006total")
})

app.get("/getnodebank/:nodeval", (req, res) => {
    //console.log("node fetch req " + req.params.nodeval)
    const value = req.params.nodeval
    const file = path.join(__dirname, "../banks/" + value + "/nodes.json")
    fs.readFile(file, "utf-8", (err, data) => {
        //console.log(data)
        res.send(data)
    })
})

app.get("/getbank/:val", (req, res) => {
    //console.log("fetch req " + req.params.val)
    const value = req.params.val
    const file = path.join(__dirname, "../banks/" + value + "/data.json")
    fs.readFile(file, "utf-8", (err, data) => {
        //console.log(data)
        res.send(data)
    })
})

app.get("/getenvvar/:envvar", (req, res) => {
    //pull up envvars get value to key send back to req
    const value = req.params.envvar
    //console.log("envvar request " + value)
    const file = path.join(__dirname, "../banks/" + globalbank /*MAKE THIS A GLOBAL VARIABLE i did :))))*/ + "/envvars.json")
    fs.readFile(file, "utf-8", (err, data) => {
        //console.log("sending back " + (JSON.parse(data))[value])
        res.send(((JSON.parse(data))[value].toString()))

    })
})

app.get("/writenenvvar/:nenvvar", (req, res) => {
    // pull up envvars get value to key and send back to req {nodename:[DATA]}
    console.log("received " + req.params.nenvvar)
    const [name, value] = JSON.parse(req.params.nenvvar)
    console.log(name + " nenvvar writing " + JSON.stringify(value))
    const file = path.join(__dirname, "../banks/" + globalbank + "/nenvvars.json")

    try {
        const data = fs.readFileSync(file, "utf-8")
        console.log("name: " + name)
        console.log("value: " + value)
        const jsondata = JSON.parse(data)
        jsondata[name] = value
        fs.writeFileSync(file, JSON.stringify(jsondata, null, 2))
        res.sendStatus(200)
        console.log("successful envvar write")
    } catch (err) {
        console.log("writing envvar failed - ", err)
        res.sendStatus(500)
    }
})

app.get("/getnenvvar/:nenvvar", (req, res) => {
    //pull up envvars get value to key send back to req
    const value = req.params.nenvvar
    console.log("nenvvar request " + value)
    const file = path.join(__dirname, "../banks/" + globalbank /*MAKE THIS A GLOBAL VARIABLE i did :))))*/ + "/nenvvars.json")
    fs.readFile(file, "utf-8", (err, data) => {
        //console.log("data: " + data)
        res.send((JSON.parse(data))[value])
    })
})

app.get("/setmode/:mode", (req, res) => {
    const value = req.params.mode
    console.log("switching mode to " + value)
    mode = value
    res.sendStatus(200)
})

app.get("/getmode", (req, res) => {
    res.send(mode)
})

app.get("/getnodetypes", (req, res) => {
    const folder = path.join(__dirname, "../client/src/components/nodetypes")
    let sendback = []
    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            console.log(file)
            if (file.endsWith(".js")) {
                sendback.push(path.parse(file).name)
            }
        })
        res.send(sendback)
    })
})

app.get("/createnode/:data", (req, res) => {
    const params = JSON.parse(req.params.data)
    console.log(params)
    const file = path.join(__dirname, "../banks/" + globalbank + "/nodes.json")
    fs.readFile(file, "utf-8", (err, data) => {
        nodes = JSON.parse(data)
        const newnode = {
            "name": params.name,
            "type": params.nodetype,
            "posx1": params.x1,
            "posy1": params.y1,
            "posx2": params.x2,
            "posy2": params.y2,
            "color": params.color,
            "inputs": []
        }
        console.log(newnode)
        const key = Object.keys(nodes).length + 1
        nodes[key] = newnode
        //console.log(data)
        fs.writeFile(file, JSON.stringify(nodes, null, 4), (err) => {
            if (err) {
                console.error("err:", err)
                res.sendStatus(500)
                return
            }
            res.sendStatus(200)
        });
    })
})

app.get("/writeinput/:data", (req, res) => {
    console.log(req.params.data)
    const stuff = JSON.parse(req.params.data)
    console.log(stuff)
    const node = Object.keys(stuff)[0]
    const val = stuff[node]
    console.log(node + " nodeval " + val)
    const file = path.join(__dirname, "../banks/" + globalbank + "/nodes.json")
    fs.readFile(file, "utf-8", (err, data) => {
        const datastuff = JSON.parse(data)

        for (const key in datastuff) {
            if (datastuff[key].name == node) {
                datastuff[key].inputs = val
                fs.writeFile(file, JSON.stringify(datastuff, null, 4), (err) => {
                    if (err) {
                        console.error("err:", err)
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(200)
                    }
                });
            }
        }


    })
    //IN CASE PC DIES YOU LEFT OFF YOURE WRITING BROWSER COMMANDS FOR NOW BUT http://localhost:3000/writeinput/{"foo": ["bar"]} WORKS IN CONSOLE NO WRITING YET
})

app.get("/getinput/:data", (req, res) => {
    const stuff = req.params.data
    console.log("check 2")
    const file = path.join(__dirname, "../banks/" + globalbank + "/nodes.json")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log("check 1")
        const datastuff = JSON.parse(data)
        for (const key in datastuff) {
            console.log("check 2 " + key)
            if (key == stuff) {
                console.log("sending " + JSON.stringify(datastuff[key]))
                res.send(datastuff[key])
            }
        }
    })
})

app.get("/getenvkeys", (req, res) => {
    const file = path.join(__dirname, "../banks/" + globalbank /*MAKE THIS A GLOBAL VARIABLE i did :))))*/ + "/envvars.json")
    console.log("envkey check 1")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log("envkey check 2")
        const list = Object.keys(JSON.parse(data))
        res.send(JSON.stringify(list))

    })
})

app.get("/getnenvkeys", (req, res) => {
    const file = path.join(__dirname, "../banks/" + globalbank + "/nenvvars.json")
    fs.readFile(file, "utf-8", (err, data) => {
        const list = Object.keys(JSON.parse(data)).map(key => "&" + key)
        res.send(JSON.stringify(list))
        console.log(list)
    })
})

app.get("/newenvvar/:data", (req, res) => {
    const stuff = JSON.parse(req.params.data)
    const node = Object.keys(stuff)[0]
    const val = stuff[node]
    const file = path.join(__dirname, "../banks/" + globalbank + "/envvars.json")
    fs.readFile(file, "utf-8", (err, data) => {
        const json = JSON.parse(data)
        json[node] = val
        console.log("node is " + node + " value is " + json[node])
        fs.writeFile(file, JSON.stringify(json, null, 4), (err) => {
            if (err) {
                console.error("err:", err)
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        });
    })
})

//unused api
app.get("/loadcount", (req, res) => {
    const file = path.join(__dirname, "../constants.json")
    fs.readFile(file, "utf-8", (err, data) => {
        const json = JSON.parse(data)
        let count = json["timesopened"]
        count += 1
        json["timesopened"] = count
        res.send(count.toString())
        fs.writeFile(file, JSON.stringify(json, null, 4), (err) => {
            if (err) {
                console.log("error")
            }
        })
    })
})




//grabFirebase("Matchbox") ONLY RUN THIS IF FOR SOME REASON YOU NEED TO UPDATE THE FIREBASE DATA

function refacc(id) {
    let score = 0
    const accfile = path.join(__dirname, "../banks/" + globalbank + "/accumulation.json")
    const file = path.join(__dirname, "../banks/" + globalbank + "/envvars.json")
    let check = {}
    fs.readFile(accfile, "utf-8", (err, data) => {
        const stuff = JSON.parse(data)
        check = stuff[id]
        console.log(JSON.stringify(check))
        //for each thing in accumulation.json get all envvar keys that have the keywords and then given the results map it to a number (obv numbers stay the way they are and true is 1 false is 0)

        fs.readFile(file, "utf-8", (err, data) => {
            const json = JSON.parse(data)
            const checklist = check["keywords"]
            //console.log("checklist " + checklist)

            Object.entries(json).forEach(([key, val]) => {
                let counter = 0
                checklist.forEach((thing) => {
                    //console.log(thing)
                    if (String(key).includes(thing)) {
                        counter += 1
                    }
                })
                //console.log(counter)
                if (counter == checklist.length) {
                    //code for complete match
                    console.log("gucci")
                }
            })
            console.log("score " + score)
            return (score)
        })
    })
}

//ex http://localhost:3000/getstat/["59","Endgame Time To Balance"]
app.get("/getstat/:array", (req, res) => {
    const parsed = JSON.parse(req.params.array)
    const team = parsed[0]
    const key = parsed[1]
    const file = path.join(__dirname, "../banks/" + globalbank + "/data.json")
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
            res.send("error")
        } else {
            const stuff = JSON.parse(data)
            const sendback = []
            if (stuff[team]) {
                for (const match in stuff[team]) {
                    if (stuff[team].hasOwnProperty(match)) {
                        if (stuff[team][match][key]) {
                            sendback.push(stuff[team][match][key])
                        }
                    }
                }
            }
            //console.log("sendback is " + sendback)
            res.send(sendback)
        }
    });
});


app.listen(5000, () => {
    console.log("server up")

})