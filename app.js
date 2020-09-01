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

const port = 3000;

async function addDefaultDb(){
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
  });
}

app.get('/', (req, res) => {

  Item.find({}, function(err, results){
    if(err){
      console.log(err);
    }
    else{
      if(results.length == 0){
        addDefaultDb();
        setTimeout(function(){
          res.redirect("/");
        }, 200);
        
      }
      else
        res.render("list", {day: dateTime, toDoList: results});
    }
  });
  
  // res.sendFile("index.html");
});

app.post('/', (req, res) =>{
  // res.send('POST request to the homepage')
  const item = new Item({
    name: req.body.newItem
  });
  item.save();
  res.redirect("/");
  // toDoList.push(req.body.newItem);
  // res.render("list", {day: dateTime, toDoList: toDoList});
});

app.post('/delete', (req, res) => {
  // console.log(req.body);
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successful remove item");
      res.redirect("/");
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
