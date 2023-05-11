const router = require("express").Router();
const controller = require('../controllers/profile.controller')

// get data by id
router.get("/profile/:id", controller.getProfileById);

// get all data
router.get("/profile", controller.getAllProfile);

// insert data
router.post("/profile", controller.addNewProfile);

// edit data
router.patch("/profile/:id", controller.editProfile);

// delete data
router.delete("/profile/:id", controller.deleteProfile);

module.exports = router;
