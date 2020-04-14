const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.get("/", (req, res)=>{
    console.log(req);
    // res.send("Hello World!!!");
    res.sendFile(path.join(__dirname, "assignment.js"))
})

app.post("/", (req, res)=>{
    // res.sendFile(path.join(__dirname, "person.json"))
    
    fs.readFile(path.join(__dirname, "person.json"), "utf-8", (err, data)=>{
        res.send(JSON.parse(data));
    })

})

app.listen(6500, (err)=>{
    console.log("Server started successfully.");
})