var express = require("express");
var router = express.Router();
var userCtrl = require("./../controllers/user");
var todoCtrl = require("./../controllers/todo");

// USER
router.post("/user/register", userCtrl.register);
router.post("/user/login", userCtrl.login);
router.post("/user/logout", userCtrl.logout);
router.post("/user/auth", userCtrl.auth);

// TODO
router.post("/todo/create", todoCtrl.create);
// router.post("/todo/retrieve", todoCtrl.retrieve);
router.post("/todo/done", todoCtrl.done);
router.post("/todo/update", todoCtrl.update);
router.post("/todo/delete", todoCtrl.delete);
router.post("/todo/drop", todoCtrl.drop);

module.exports = router;
