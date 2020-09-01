const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dateTime = require(__dirname + "/date.js");

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/todolistDB",  { useNewUrlParser: true,  useUnifiedTopology: true});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const itemSchema = {
  name: String
};

//Item collection and the schema to create collection
const Item = mongoose.model("Item", itemSchema);

const toDoList = ["apply", "study"];

const port = 3000;



app.get('/', (req, res) => {
  const item1 = new Item({
    name: "apply"
  });
  const item2 = new Item({
    name: "study"
  });

  Item.insertMany([item1, item2], function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully add default items to database");
    }
  })
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
