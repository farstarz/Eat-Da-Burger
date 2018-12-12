const express = require('express');

let PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));

// parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// set handlebars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// import routes and give server access
let routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("App now listening at localhost:" + PORT);
});
