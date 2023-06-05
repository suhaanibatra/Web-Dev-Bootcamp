const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose.connect("mongoDb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});
// /?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://suhaanibatra23:hnc3eePjhQ1WQj32@cluster0.t3dxbst.mongodb.net/todolistDB", {useNewUrlParser: true});


const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Tap + button to add an item."
});

const item3 = new Item({
  name: "Click checkbox to delete item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {
  Item.find({}).then((foundItems) =>{

    if(foundItems.length === 0){

      Item.insertMany(defaultItems).then((res) =>{
        console.log("Successfully saved default items to the DB");
      }).catch((err) =>{
        console.log(err);
      });

      res.redirect("/");
    } else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }

  });

});

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}).then(function(foundList){
    if(!foundList){
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/" + customListName);
    }
    else{
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
    
  }).catch((err) =>{
    console.log(err);
  });





});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item_ = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item_.save();
    res.redirect("/");
  } 
  
  else{
    List.findOne({name: listName}).then(function(foundList){
      foundList.items.push(item_);
      foundList.save();
      res.redirect("/" + listName);
    }).catch((err) => {
      console.log(err);
    });
  }
  
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId).then(function(){
      res.redirect("/");
    })
    // Item.findByIdAndRemove(checkedItemId).catch(function(err){
    //   if(!err){
    //     console.log("Successfully deleted checked item");
    //     res.redirect("/");
    //   }
    // });
  }
  else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(function(){
      res.redirect("/" + listName);
    }).catch((err) =>{
      console.log(err);
    });

  } 

});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started in port 3000 successfully");
});

















