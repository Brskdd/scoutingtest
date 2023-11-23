const express = require("express")
const app = express()
const fs = require("fs");
const path = require("path");

let randvar = 100;
function randtherandvar() {
    randvar = Math.floor((Math.random())*100)
}
const runtherandtherandvar = setInterval(randtherandvar,2000);

app.get("/api", (req,res) => {
    res.send(randvar.toString())
})

app.get("/getvalue/:val", (req,res) => {
    console.log("fetch requesting " + req.params.val)
    const value = req.params.val;
    const file = path.join(__dirname, "../schemas/MatchBox/data.json")
    fs.readFile(file, "utf-8", (err, data) => {
        console.log("data is " + data)
        const jsondata = JSON.parse(data)
        console.log(jsondata)
        //find a way to support any schema not just MatchBox
        //blah blah blah look through data for variable and its name
        // ------------------------------------------------------------------- THIS IS PROBABLY A DANGER ZONE TO BOLOW UP IN THE FACE ONCE THE REAL DATA COMES IN
        const returnval = jsondata[value]
        console.log(returnval)
        res.send(returnval.toString())
    })
})

app.listen(5000, () => {
    console.log("server up")
})