const usersData = require("../data/users");

const dataState = {
  users: require("../data/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const getUsers = (req, res) => {
  const userID = req.params.id;
  console.log(userID);

  const userInfo = dataState.users.find((item) => item.id === Number(userID));
  console.log(userInfo);
  res.send(userInfo ? userInfo : "User not found!!");
};
const postUser = (req, res) => {
  const newUser = { id: dataState.users.length + 1, ...req.body };
  dataState.setUsers([...dataState.users, newUser]);
  res.status(201).send(dataState.users);
};

const deleteUser = (req, res) => {
  const userID = Number(req.params.id);
  console.log(userID);
  const newUsersData = dataState.users.filter((item) => item.id !== userID);
  dataState.setUsers(newUsersData);
  res.send(dataState.users);
};
const updateUser = (req, res) => {
  const { name, age } = req.body;
  const newData = dataState.users.filter(
    (item) => item.id === Number(req.params.id)
  );
  dataState.setUsers([
    ...dataState.users,
    { id: Number(req.params.id), name, age },
  ]);
  res.send(dataState.users);
};
module.exports = {
  getUsers,
  postUser,
  deleteUser,
  updateUser,
};
