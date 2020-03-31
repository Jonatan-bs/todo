var express = require("express");
var router = express.Router();
var userCtrl = require("./../controllers/user");
var listCtrl = require("./../controllers/list");
var todoCtrl = require("./../controllers/todo");

router.post("/user/register", userCtrl.register);
router.post("/user/login", userCtrl.login);
router.post("/user/logout", userCtrl.logout);
router.post("/list/create", listCtrl.create);
router.post("/list/update", listCtrl.update);
router.post("/list/retrieve", listCtrl.retrieve);
router.post("/list/deactivate", listCtrl.deActivate);
router.post("/todo/create", todoCtrl.create);
router.post("/todo/retrieve", todoCtrl.retrieve);
router.post("/todo/done", todoCtrl.done);
router.post("/todo/update", todoCtrl.update);
router.post("/todo/delete", todoCtrl.delete);

module.exports = router;
