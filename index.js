//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
const needle = require('needle');

var app = express();

var port = process.env.PORT || 8080;
var db_name = process.env.DB_TABLE || "checkist";

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = [];
//placeholders for removed task
var complete = [];

var datecomplete = [];

var helper = require('./helper');
var loaded = false;

//post route for adding new task 
app.post("/addtask", function(req, res) {
	
	if (!loaded) {
		return;
	}
	
    var newTask = req.body.newtask;
    task.push(newTask);
	
	var req = {
		update_checkist: db_name,
		json: JSON.stringify({ task: task, complete: complete, datecomplete: datecomplete })
	};
	
	needle.post('https://palz.one/server.php', req, 
		function(err, resp, body){
			console.log(body);
			res.redirect("/");
	});
	
});

app.post("/removetask", function(req, res) {
	
	if (!loaded) {
		return;
	}
	
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
		datecomplete.push(new Date());
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
			datecomplete.push(new Date());
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    
	var req = {
		update_checkist: db_name,
		json: JSON.stringify({ task: task, complete: complete, datecomplete: datecomplete })
	};
	
	needle.post('https://palz.one/server.php', req, 
		function(err, resp, body){
			console.log(body);
			res.redirect("/");
	});
});

app.post("/redotask", function(req, res) {
	
	if (!loaded) {
		return;
	}
	
    var redoTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof redoTask === "string") {
        task.push(redoTask);
        //check if the completed task already exits in the task when checked, then remove it
        complete.splice(complete.indexOf(redoTask), 1);
		datecomplete.splice(datecomplete.indexOf(redoTask), 1);
    } else if (typeof redoTask === "object") {
        for (var i = 0; i < redoTask.length; i++) {
            task.push(redoTask[i]);
            complete.splice(complete.indexOf(redoTask[i]), 1);
			datecomplete.splice(datecomplete.indexOf(redoTask[i]), 1);
        }
    }
    
	var req = {
		update_checkist: db_name,
		json: JSON.stringify({ task: task, complete: complete, datecomplete: datecomplete })
	};
	
	needle.post('https://palz.one/server.php', req, 
		function(err, resp, body){
			console.log(body);
			res.redirect("/");
	});
});

app.post("/deletetask", function(req, res) {
	
	if (!loaded) {
		return;
	}
	
    var deleteTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof deleteTask === "string") {
        complete.splice(complete.indexOf(deleteTask), 1);
		datecomplete.splice(datecomplete.indexOf(deleteTask), 1);
    } else if (typeof deleteTask === "object") {
        for (var i = 0; i < deleteTask.length; i++) {
            complete.splice(complete.indexOf(deleteTask[i]), 1);
			datecomplete.splice(datecomplete.indexOf(deleteTask[i]), 1);
        }
    }
    
	var req = {
		update_checkist: db_name,
		json: JSON.stringify({ task: task, complete: complete, datecomplete: datecomplete })
	};
	
	needle.post('https://palz.one/server.php', req, 
		function(err, resp, body){
			console.log(body);
			res.redirect("/");
	});
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
	
	needle.get('https://palz.one/server.php?get_checkist=' + db_name, function(error, response) {
	if (!error && response.statusCode == 200) {
		var result = JSON.parse(JSON.parse(response.body)[0].json);
		task = result.task;
		complete = result.complete;
		datecomplete = [];
		for (var i = 0; i < result.datecomplete.length; i++) {
			datecomplete[i] = new Date(result.datecomplete[i]);
		}
		res.render("index", { task: task, complete: complete, datecomplete: datecomplete, helper: helper });
		loaded = true;
	}});
	
});

app.listen(port, function() {
    console.log("server is running on port " + port);
});