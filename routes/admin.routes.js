const router = require("express").Router();
const controller = require("../controllers/auth.controller");

// get data by id
router.post("/auth/login", controller.loginUser);

module.exports = router;
