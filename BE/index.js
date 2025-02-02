const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3500;

//importing the third party middleware
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//using the third party middleware
app.use(cors()); //allows access to all origins to access this app's API's or routes etc.

//using a custom middleware for looging request method and path name
app.use((req, res, next) => {
  console.log(req.method, " ", req.path);
  next();
});

//using some built in middlewares
app.use(express.urlencoded());

//middleware to parse the JSON requests
app.use(express.json());

app.use(express.static(path.join(__dirname, "/Public")));
app.use("/home", express.static(path.join(__dirname, "/Public")));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use(require("./middleware/verifyToken"));
app.use("/home", require("./routes/root"));

//page not found handling [404 status code]
app.all("*", (req, res) => {
  res.status(404);
  console.log(req.accepts());
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  }
});

//listening to the PORT
app.listen(PORT, () => {
  console.log("Listening to port ", PORT);
});
