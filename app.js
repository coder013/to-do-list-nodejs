const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");
const favicon = require("serve-favicon");
const routes = require("./routes");
const todo = require("./routes/todo");

const app = express();
const port = 3000;

app.set("port", port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

if ("development" == app.get("env")) {
    app.use(errorHandler());
}

app.get("/", routes.index);
app.get("/list", todo.list);
app.post("/add", todo.add);
app.post("/done", todo.done);
app.post("/del", todo.del);

http.createServer(app).listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});