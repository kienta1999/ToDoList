const express = require("express");
const app = express();
app.set('view engine', 'ejs');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

const toDoList = ["apply", "study"];

const port = 3000;

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

app.get('/', (req, res) => {
  
  res.render("list", {day: dateTime, toDoList: toDoList});
  // res.sendFile("index.html");
});

app.post('/', (req, res) =>{
  // res.send('POST request to the homepage')
  toDoList.push(req.body.newItem);
  res.render("list", {day: dateTime, toDoList: toDoList});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
