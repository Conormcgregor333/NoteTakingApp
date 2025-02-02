const userDB = {
  users: require("../data/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const path = require("path");
const registerUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).send("User and password are required");
  }
  const duplicate = userDB.users.find((item) => item.user === user);
  if (duplicate) {
    res.status(400).send("User already exists");
  } else {
    try {
      const hashedPwd = await bcrypt.hash(pwd, 10);
      userDB.setUsers([
        ...userDB.users,
        { id: userDB.users.length + 1, user, pwd: hashedPwd },
      ]);
      await fs.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(userDB.users)
      );
      res.status(201).send(`User ${user} registered successfully`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
module.exports = {
  registerUser,
};
