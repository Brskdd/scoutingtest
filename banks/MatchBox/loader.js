const fs = require("fs");
const path = require("path");

function grabFirebase() {
    const admin = require("firebase-admin")
    const acct = require("../../sheet-import-test-c264f-firebase-adminsdk-qa32b-402f4515f0.json")

    admin.initializeApp({
        credential: admin.credential.cert(acct),
        databaseURL: "https://sheet-import-test-c264f-default-rtdb.firebaseio.com"
    })
    const database = admin.database()

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
        fs.writeFile("./data.json", JSON.stringify(newdata, null, 2), (err) => { console.log(err) })
    })
}


//grabFirebase() ONLY RUN THIS IF FOR SOME REASON YOU NEED TO UPDATE THE FIREBASE DATA

//purpose is to turn data.json into envvars.json

function zeropad(num) {
    return String(num).padStart(5, "0")
}

function delspace(str) {
    return String(str).replaceAll(" ", "")
}

const envvarsfile = path.join(__dirname, "/envvars.json")
let envvars = {}
fs.readFile(envvarsfile, "utf-8", (err, stuff) => {
    //IN CASE YOU FORGET WHERE YOU LEFT OFF 1-9-24 YOU WERE GETTING DATA.JSON INTO ENVVARS.JSON
    envvars = JSON.parse(stuff)
})

console.log(__dirname)
const datafile = path.join(__dirname, "/data.json")
fs.readFile(datafile, "utf-8", (err, stuff) => {
    const data = JSON.parse(stuff)
    for (const team in data) {
        const teamdata = data[team]
        for (const match in teamdata) {
            const matchdata = teamdata[match]
            for (const key in matchdata) {
                const val = matchdata[key]
                console.log(zeropad(team) + zeropad(match) + delspace(key) + ":" + val)
                envvars[zeropad(team) + zeropad(match) + delspace(key)] = val
                
            }
        }
    }
    fs.writeFile(envvarsfile, JSON.stringify(envvars, null, 4), (err) => {
        if (err) {
            console.error("err:", err)
            return
        }
        console.log("yippee")
    });
})