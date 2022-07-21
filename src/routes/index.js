const Router = require("express").Router;

const router = Router();

// import routers
const todoRoutes = require("./todo.routes");

router.use("/todo",  todoRoutes);

module.exports = router;