/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Sahar HosseiniChegeni Student ID: 139670202   Date: 21-10-24
*
* Online (Heroku) Link: 
********************************************************************************/

const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
var dataService = require("./data-service");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public/')); 

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
};

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/employees/add", function(req,res){
  res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
});

app.get("/images/add", function(req,res){
  res.sendFile(path.join(__dirname,"/views/addImage.html"));
});

app.post("/employees/add", function (req, res) {
  dataService.addEmployee(req.body)
    .then(() => {
      res.redirect("/employees");
    });
});

app.get("/employees", function (req, res) {
  if (req.query.status) {
    dataService.getEmployeesByStatus(req.query.status)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      })
  }
  else
    if (req.query.department) {
      dataService.getEmployeesByDepartment(req.query.department)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        })
    }
    else 
    if (req.query.isManager) {
      dataService.getEmployeesByManager(req.query.isManager)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        })
    }
    else {
      dataService.getAllEmployees()
        .then((data) => {
          console.log("getAllEmployees JSON.");
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        })
    }
});

app.get("/employees/:num", function (req, res) {
  dataService.getEmployeeByNum(req.params.num)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});
/********************************* Image Handler **********************************/
//**********************************************************************************/
const storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post("/images/add", upload.single("imageFile"), function (req, res) {
  res.redirect("/images");
});

app.get("/images", function (req, res) {
  var imagePath = '/public/images/uploaded'; 
  fs.readdir(path.join(__dirname, imagePath), function (err, items) {
    var imagesContent = { images: [] };
    var size = items.length;
    for (var i = 0; i < items.length; i++) {
      imagesContent.images.push(items[i]);
    }
    res.json(imagesContent);
  });

});
/********************************* End Of Image Handler ********************************/
//***************************************************************************************/

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