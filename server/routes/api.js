var express = require("express");
var router = express.Router();
var userCtrl = require("./../controllers/user");
var listCtrl = require("./../controllers/list");
var todoCtrl = require("./../controllers/todo");

router.post("/user/register", userCtrl.register);
router.post("/user/login", userCtrl.login);
router.post("/user/logout", userCtrl.logout);
router.post("/list/create", listCtrl.create);
router.post("/todo/create", todoCtrl.create);

module.exports = router;
