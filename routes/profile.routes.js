const router = require("express").Router();
const controller = require("../controllers/profile.controller");
const middleware = require("../middleware/jwt.middleware");

// get data by id
router.get("/profile/:id", middleware, controller.getProfileById);

// get all data
router.get("/profile", middleware, controller.getAllProfile);

// insert data
router.post("/profile", controller.addNewProfile);

// edit data
router.patch("/profile", middleware, controller.editProfile);

// delete data
router.delete("/profile", middleware, controller.deleteProfile);

module.exports = router;
