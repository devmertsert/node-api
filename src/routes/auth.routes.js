const { Router } = require("express");
const router = Router();

// import validator
const { signup, signin, validate } = require("../helpers/validator");

// import controllers
const Controller = require("../controllers/auth.controllers");

router.post("/signup", signup(), validate, Controller.signup);
router.post("/signin", signin(), validate, Controller.signin);

module.exports = router;