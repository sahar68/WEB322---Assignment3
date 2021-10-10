const fs = require("fs");

var employees = [];
var departments = [];

//*****************************************************************/
exports.initialize = function () {
    var promise = new Promise((resolve, reject) => {
        try {
            fs.readFile('./data/employees.json', (err, data) => {
                if (err) throw err;
                employees = JSON.parse(data);
                console.log("employees correctly loaded.");
            })
            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;
                departments = JSON.parse(data);
                console.log("departments correctly loaded.");
            })
        } catch (ex) {
                      console.log("Initialize failed.");
                      reject("Initialize failed.");
                     }
        console.log("Initialize successful!.");
        resolve("Initialize successful!.");
    })
    return promise;
};
//**************************************************************/
exports.getAllEmployees = function () {
    var promise = new Promise((resolve, reject) => {
       if(employees.length === 0) {
        var err = "No results returned.";
        reject({message: err});
       }  
    resolve (employees);
    })
    return promise;
};

//*************************************************************/
exports.getManagers = function () {
    var managersLength = [];
    var promise = new Promise((resolve, reject) => {
       for (var i=0; i < employees.length; i++){
           if (employees[i].isManager == true) {
            managersLength.push(employees[i]);
           }
       }
       if(managersLength.length === 0) {
        var err = "No results returned";
        reject({message: err});
       }  
    resolve (managersLength);
    })
    return promise;
};

//***************************************************************/
exports.getDepartments = function () {
    var promise = new Promise((resolve, reject) => {
        if(departments.length === 0) {
         var err = "No results returned.";
         reject({message: err});
        }  
     resolve (departments);
     })
     return promise;
};