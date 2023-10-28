const {
  forgetPassword,
  userSignIn,
  userSignUp,
  changePassword,
} = require("../controllers/UserController");
const tokenValidation = require("../middlewares/TokenValidation");

const express = require("express");

const router = express.Router();

router.post("/forget-password", forgetPassword);
router.post("/sign-in", userSignIn);
router.post("/sign-up", userSignUp);
router.put("/change-password", tokenValidation, changePassword);

module.exports = router;
