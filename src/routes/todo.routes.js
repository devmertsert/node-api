const { Router } = require("express");
const router = Router();

// import controllers
const Controller = require("../controllers/todo.controllers");

// import jwt validate middleware
const { verifyJwtToken } = require("../helpers/jwt");

// import validator
const { todoCreate, todoGetById, todoUpdate, todoDelete, validate } = require("../helpers/validator");

router.get("/", verifyJwtToken, Controller.list);
router.get("/:id", todoGetById(), validate, verifyJwtToken, Controller.getById);
router.post("/", verifyJwtToken, todoCreate(), validate, Controller.create);
router.put("/:id", verifyJwtToken, todoUpdate(), validate, Controller.update);
router.delete("/:id", verifyJwtToken, todoDelete(), validate, Controller.delete);

module.exports = router;