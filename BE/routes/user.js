const express = require("express");
const router = express.Router();
let users = require("../data/users");
const userController = require("../controllers/usersController");
router.route("/").post((req, res) => {
  userController.postUser(req, res);
});

router
  .route("/:id")
  .get((req, res) => {
    userController.getUsers(req, res);
  })
  .delete((req, res) => {
    userController.deleteUser(req, res);
  })
  .put((req, res) => {
    userController.updateUser(req, res);
  });

module.exports = router;
