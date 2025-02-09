const UserDB = require("../Model/Users");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  if (!user || !pwd || !email) {
    res.status(400).send("User ,password and email are required");
  }
  const duplicate = await UserDB.findOne({ email });
  if (duplicate) {
    res.status(400).send("User already exists");
  } else {
    try {
      const hashedPwd = await bcrypt.hash(pwd, 10);
      await UserDB.create({ user: user, password: hashedPwd, email: email });
      res.status(201).send(`User ${user} registered successfully`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
module.exports = {
  registerUser,
};
