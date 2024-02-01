const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")

const bodyParse = require("body-parser")


let globalbank = "MatchBox" //FIGURE OUT A WAY TO CONFIG THIS
let randvar = 100;
let mode = "view"

const loader = require("../banks/" + globalbank + "/loader.js")

function randtherandvar() {
    randvar = Math.floor((Math.random()) * 100)
}
const runtherandtherandvar = setInterval(randtherandvar, 2000);

app.get("/api", (req, res) => {
    res.send(randvar.toString())
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
        datastuff[node].inputs = JSON.stringify(val)
        fs.writeFile(file, JSON.stringify(datastuff, null, 4), (err) => {
            if (err) {
                console.error("err:", err)
                res.sendStatus(500)
                return
            }
            res.sendStatus(200)
        });
    })
    //IN CASE PC DIES YOU LEFT OFF YOURE WRITING BROWSER COMMANDS FOR NOW BUT http://localhost:3000/writeinput/{"foo": ["bar"]} WORKS IN CONSOLE NO WRITING YET
})

app.get("/getinput/:data", (req, res) => {
    const stuff = JSON.parse(req.params.data)
    const file = path.join(__dirname, "../banks/" + globalbank + "/nodes.json")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log("check 1")
        const datastuff = JSON.parse(data)
        for (const key in datastuff) {
            console.log("check 2 " + key)
            if (datastuff[key].name == stuff) {
                console.log("sending " + JSON.stringify(datastuff[key]))
                res.send(JSON.stringify(datastuff[key]))
            }
        }
    })
})




//BLAH BLAH BLAH MAGMA TELLING ME TO CHECK THE FIREBASE FOR THANG AND MOVE IT INTO THE BANK



function grabFirebase(path) {

    const datapath = "/" + "2023Worlds" //should i implement a way to change this later
    const datareference = database.ref(datapath)

    datareference.once("value", (snapshot) => {
        const data = snapshot.val()
        //console.log("Data: " + JSON.stringify(data))

        //turn into json format where there are no comments and its structured by teams and for each team it is an array of matches and each match is a list of pairs so like


        const newdata = {}
        Object.entries(data).forEach(([key, val]) => {
            const [match, team] = key.split("_")
            //console.log("match is " + match)
            //console.log("team is " + team)
            if (!newdata[team]) {
                newdata[team] = {}
            }
            newdata[team][match] = val
        })

        fs.writeFile("./../banks/" + path + "/data.json", JSON.stringify(newdata, null, 2), (err) => { console.log(err) })
    })
}


//grabFirebase("Matchbox") ONLY RUN THIS IF FOR SOME REASON YOU NEED TO UPDATE THE FIREBASE DATA



app.listen(5000, () => {
    console.log("server up")
})