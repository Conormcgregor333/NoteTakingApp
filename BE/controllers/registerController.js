const UserDB = require("../Model/Users");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).send("User and password are required");
  }
  // const duplicate = userDB.users.find((item) => item.user === user);
  const duplicate = await UserDB.findOne({ user: user });
  if (duplicate) {
    res.status(400).send("User already exists");
  } else {
    try {
      const hashedPwd = await bcrypt.hash(pwd, 10);
      await UserDB.create({ user: user, password: hashedPwd });
      res.status(201).send(`User ${user} registered successfully`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
module.exports = {
  registerUser,
};
