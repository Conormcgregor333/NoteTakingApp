const userDB = {
  users: require("../data/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fs = require("fs").promises;
const path = require("path");
const logoutUser = async (req, res) => {
  //log req with acc token and ref in cookie
  // BE checks token
  //if valid clears the cookie , deletes ref token from DB and FE clears he acc token from memory
  // if invalid sends 403
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const foundUser = userDB.users.find(
    (item) => item.refresh_token === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("refresh_token");
    return res.sendStatus(403);
  }
  const usersData = userDB.users.filter(
    (item) => item.refreshToken !== refreshToken
  );
  userDB.setUsers(usersData);
  await fs.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(usersData)
  );
  res.clearCookie("refresh_token");
  res.status(200).send("Logged out successfully");
};
module.exports = { logoutUser };
