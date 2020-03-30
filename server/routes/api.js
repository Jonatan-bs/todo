var express = require("express");
var router = express.Router();
var userCtrl = require("./../controllers/user");

router.post("/user/register", userCtrl.register);
router.post("/user/login", userCtrl.login);
router.post("/user/getSession", userCtrl.getSession);
router.post("/user/logout", userCtrl.logout);
router.post("/user/verify", userCtrl.verify);

module.exports = router;
