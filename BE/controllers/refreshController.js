const UserDB = require("../Model/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const refreshTokenAccess = async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) {
    return res.sendStatus(401);
  }
  const foundUser = await UserDB.findOne({ refresh_token: token }).exec();
  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) {
      return res.sendStatus(403);
    }
    req.email = decoded.email;
    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.send({ access_token: newAccessToken });
  });
};
module.exports = { refreshTokenAccess };
