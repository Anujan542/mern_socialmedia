const express = require("express");
const {
  searchUser,
  getUser,
  updateProfile,
} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/search").get(protect, searchUser);
router.route("/user/:id").get(protect, getUser);
router.route("/update").patch(protect, updateProfile);

module.exports = router;
