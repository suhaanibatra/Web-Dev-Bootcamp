//jshint esversion: 6

const express = require("express");
const bodyParer = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParer.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
    var item = req.body.newItem;

    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    } 
});


app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(3000, function(){
    console.log("Serving running at port 3000");
});

