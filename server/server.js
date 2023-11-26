const express = require("express")
const app = express()
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin")
const acct = require("../sheet-import-test-c264f-firebase-adminsdk-qa32b-402f4515f0.json")
admin.initializeApp({
    credential: admin.credential.cert(acct),
    databaseURL: "https://sheet-import-test-c264f-default-rtdb.firebaseio.com"
})
const database = admin.database()

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
    console.log("node fetch req " + req.params.nodeval)
    const value = req.params.nodeval
    const file = path.join(__dirname, "../banks/" + value + "/nodes.json")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log(data)
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