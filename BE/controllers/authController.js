const userDB = {
  users: require("../data/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();
const authenticateUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).send("User and password are required");
  }
  const foundUser = userDB.users.find((item) => item.user === user);
  if (!foundUser) {
    res.status(400).send("User not found");
  } else {
    try {
      const result = await bcrypt.compare(pwd, foundUser.pwd);
      if (result) {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const access_token = jwt.sign(
          { username: foundUser.user },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        console.log("Access token: ", access_token);
        const refresh_token = jwt.sign(
          { username: foundUser.user },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        const usersData = userDB.users.filter(
          (item) => item.user !== foundUser.user
        );
        const updatedUsersData = [
          ...usersData,
          { ...foundUser, refresh_token },
        ];
        await fs.writeFile(
          path.join(__dirname, "..", "data", "users.json"),
          JSON.stringify(updatedUsersData)
        );
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.send(`Access token: ${access_token}`);
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
module.exports = { authenticateUser };
