var express = require('express');
const path = require('path');
var dataService = require('/data-service.js');

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


  // app.get("/employees", function(req,res){
  //   dataService.employees()
  //     .then((data) => {
  //       console.log ("Employees JSON file");
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.json(err);
  //     })
  // });



  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

app.listen(HTTP_PORT, onHttpStart);