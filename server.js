/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: __Sahar Hosseinichegeni____________________ Student ID: _139670202___ Date: _21-10-10___
*
* Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/

var express = require("express");
const path = require("path");
var dataService = require("./data-service");

var app = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
};

app.use(express.static('public')); 

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname,"/views/about.html"));
});

//********************************************************** */
  app.get("/employees", function(req,res){
    dataService.getAllEmployees()
      .then((data) => {
        console.log ("Employees JSON file");
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  });

//************************************************************/
app.get("/managers", function(req,res){
  dataService.getManagers()
    .then((data) => {
      console.log ("getManagers JSON.");
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});
//*************************************************************/
app.get("/departments", function(req,res){ 
  dataService.getDepartments()
    .then((data) => {
      console.log ("getDepartments JSON.");
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
 });

 //************************************************************* */
  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

  console.log ("Ready for initialize");
    dataService.initialize()
      .then(() => {
        console.log ("Initialize");
        app.listen(HTTP_PORT, onHttpStart);
     })
      .catch(err => {
        console.log(err);
     })