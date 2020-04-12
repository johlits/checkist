//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = [];
//placeholders for removed task
var complete = [];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.post("/redotask", function(req, res) {
    var redoTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof redoTask === "string") {
        task.push(redoTask);
        //check if the completed task already exits in the task when checked, then remove it
        complete.splice(complete.indexOf(redoTask), 1);
    } else if (typeof redoTask === "object") {
        for (var i = 0; i < redoTask.length; i++) {
            task.push(redoTask[i]);
            complete.splice(complete.indexOf(redoTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.post("/deletetask", function(req, res) {
    var deleteTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof deleteTask === "string") {
        complete.splice(complete.indexOf(deleteTask), 1);
    } else if (typeof deleteTask === "object") {
        for (var i = 0; i < deleteTask.length; i++) {
            complete.splice(complete.indexOf(deleteTask[i]), 1);
        }
    }
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

app.listen(port, function() {
    console.log("server is running on port " + port);
});