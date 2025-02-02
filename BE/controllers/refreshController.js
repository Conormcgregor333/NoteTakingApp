const userDB = {
  users: require("../data/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const refreshTokenAccess = (req, res) => {
  const token = req.cookies?.refresh_token;
  console.log(req.cookies);
  console.log(token);
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    const newAccessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.send({ access_token: newAccessToken });
  });
};
module.exports = { refreshTokenAccess };
