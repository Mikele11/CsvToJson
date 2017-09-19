var path = require("path");
var fs = require('fs');
var csvjson = require('csvjson');
var file1 = 'users1';
var file2 = 'users2';
function parser(file){
var data = fs.readFileSync(path.join(__dirname, 'csv/'+file+'.csv'), { encoding : 'utf8'});
var options = {
  delimiter : ',', // optional 
  quote     : '"' // optional 
};
csvjson.toObject(data, options);
var stuge = {
  name: "string",
  phone: "string",
  person: {
    firstName: {
    "type": "string"
    },
   lastName: {
    "type": "string"
    },
  },
  amount: "number",
  date: "date",
  costCenterNum: "string"
};
var pot = data.indexOf('"date"')+6;
var copyFile = data;
while (copyFile.length>100){
//----------------------------------FIRST NAME
   var copyFile = copyFile.substring(pot+3,copyFile.length);
   var copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   stuge.person.firstName = '"'+ copy;
   pot = copy.length; 
   //console.log(stuge.person.firstName);
  
   //----------------------LAST nAAME
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   stuge.person.lastName = '"'+ copy;
   pot = copy.length;
   console.log(stuge.person.lastName);
   
//-------------USER
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   var user = '"'+ copy;
   pot = copy.length;
   //console.log(user);

//-------------EMAIL
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   var email = '"'+ copy;
   pot = copy.length;
   //console.log(email);

//--------------NAME
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   stuge.name = '"'+ copy;
   pot = copy.length;
   //console.log(stuge.name);

//-------------PHONE
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   stuge.phone = '"'+ copy;
   pot = copy.length;
   //console.log(stuge.phone);

//-----------CC
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(3,copyFile.indexOf('"')+1);
   stuge.costCenterNum = '"'+ copy;
   pot = copy.length;
   //console.log(stuge.costCenterNum);

//-------AMAUNT
   copyFile = copyFile.substring(pot+5,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('|'));
   stuge.amount = '"'+ copy+'"';
   pot = copy.length;
   //console.log(stuge.amount);
//-----------DATE   
   copyFile = copyFile.substring(pot+3,copyFile.length);
   copy = copyFile.substring(0,copyFile.indexOf('"')+1);
   stuge.date = '"'+ copy;
   pot = copy.length;
   //console.log(stuge.date);
   
// -   WRITE TO FILE
   //var str = JSON.stringify(stuge);
   var str = '';
   str ='{'+'\n'+'  "name":'+stuge.name+'\n'+'  "phone":'+stuge.phone+'\n'+'  "person": {'+'\n'+'   "firstName":'+stuge.person.firstName+'\n'+'   "lastName":'+stuge.person.lastName+'\n'+'   }'+'\n'+'  "amount":'+stuge.amount+'\n'+'  "date":'+stuge.date+'\n'+'  "costCenterNum":'+stuge.costCenterNum+'\n'+'}'+'\n';
   fs.appendFileSync("json/"+file+".json", str+'\n');  
};   
};
parser(file1);
parser(file2);
console.log('parsing comlete. Look in path json');