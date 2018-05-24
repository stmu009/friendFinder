var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(port, function () {
    console.log("App listening on http://localhost:" + port)
});