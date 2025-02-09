const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
//importing the third party middleware
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { NotesDbConnection } = require("./config/NotesDB");
require("dotenv").config();
app.use(cookieParser());
//using the third party middleware

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allows cookies to be sent/received
  })
);

//using a custom middleware for looging request method and path name
app.use((req, res, next) => {
  console.log(req.method, " ", req.path);
  next();
});
NotesDbConnection();
//using some built in middlewares
app.use(express.urlencoded({ extended: true }));

//middleware to parse the JSON requests
app.use(express.json());

app.use(express.static(path.join(__dirname, "/Public")));
app.use("/home", express.static(path.join(__dirname, "/Public")));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/loguot"));
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

//listening to the PORT only when the DB connection is successful
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected ✅");
  app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
  });
});
