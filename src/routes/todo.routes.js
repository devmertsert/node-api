const { Router } = require("express");
const router = Router();

// import controllers
const Controller = require("../controllers/todo.controllers");

router.use("/", Controller.list);

module.exports = router;