const { Router } = require("express");
const router = Router();

// import controllers
const Controller = require("../controllers/todo.controllers");

// import jwt validate middleware
const { verifyJwtToken } = require("../helpers/jwt");

// import validator
const { todoCreate, validate } = require("../helpers/validator");

router.get("/", verifyJwtToken, Controller.list);
router.post("/create", verifyJwtToken, todoCreate(), validate, Controller.create);

module.exports = router;