const express = require("express")
const app = express()
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin")
const acct = require("../sheet-import-test-c264f-firebase-adminsdk-qa32b-402f4515f0.json")
const bodyParse = require("body-parser")

admin.initializeApp({
    credential: admin.credential.cert(acct),
    databaseURL: "https://sheet-import-test-c264f-default-rtdb.firebaseio.com"
})
const database = admin.database()
let globalbank = "MatchBox" //FIGURE OUT A WAY TO CONFIG THIS
let randvar = 100;

//why did i still leave this here kinda scared to remove it tho ngl
function randtherandvar() {
    randvar = Math.floor((Math.random()) * 100)
}
const runtherandtherandvar = setInterval(randtherandvar, 2000);

app.get("/api", (req, res) => {
    res.send(randvar.toString())
})

//i feel like i should get rid of this nvm ignore the comment i actually did X333333

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
    console.log("envvar request " + value)
    const file = path.join(__dirname, "../banks/" + globalbank /*MAKE THIS A GLOBAL VARIABLE i did :))))*/ + "/envvars.json")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log("sending back " + (JSON.parse(data))[value])
        res.send(((JSON.parse(data))[value].toString()))
    })
})

app.get("/writenenvvar/:nenvvar", (req, res) => {
    //pull up envvars get value to key send back to req {nodename:[DATA]}
    console.log("recieved " + req.params.nenvvar)
    const [name, value] = JSON.parse(req.params.nenvvar)
    console.log(name + " nenvvar writing " + JSON.stringify(value))
    const file = path.join(__dirname, "../banks/" + globalbank + "/nenvvars.json")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log("name: " + name)
        console.log("value: " + value)
        jsondata = JSON.parse(data)
        jsondata[name] = value
        fs.writeFile(file, JSON.stringify(jsondata, null, 2), (err) => {
            if (err) {
                console.log("writing envvar failed")
            } else {
                res.status(200)
            }
        })
    })
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

//BLAH BLAH BLAH MAGMA TELLING ME TO CHECK THE FIREBASE FOR THANG AND MOVE IT INTO THE BANK


//could we make it so that per bank it contains a loader function that turns raw data into envvars so all we have to do is
/*
import bank/loader.js
load()
*/
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

        //hey so like why is there 50 lines of commented out json

        /* need to go from

        match1_team1: {
            param1:1,
            param2:true
        },
        match1_team2: {
            param1:1,
            param2:true
        },
        match2_team1: {
            param1:1,
            param2:true
        },
        match2_team2: {
            param1:1,
            param2:true
        },

        to
        
        team1: {
            match1: {
                param1:1,
                param2: true
            },
            match2: {
                param1:1,
                param2: true
            }
        },
        team2: {
            match1: {
                param1:1,
                param2: true
            },
            match2: {
                param1:1,
                param2: true
            }
        }

        also delete notes
        */
        fs.writeFile("./../banks/" + path + "/data.json", JSON.stringify(newdata, null, 2), (err) => { console.log(err) })
    })
}


grabFirebase("Matchbox")



app.listen(5000, () => {
    console.log("server up")
})