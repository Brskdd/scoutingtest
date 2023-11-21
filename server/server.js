const express = require("express")
const app = express()

let randvar = 100;
function randtherandvar() {
    randvar = Math.floor((Math.random())*100)
}
const runtherandtherandvar = setInterval(randtherandvar,2000);

app.get("/api", (req,res) => {
    res.send(randvar.toString())
})

app.listen(5000, () => {
    console.log("server up")
})