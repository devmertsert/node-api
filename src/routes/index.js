const Router = require("express").Router;

const router = Router();

// import routers
const todoRoutes = require("./todo.routes");
const authRoutes = require("./auth.routes");

router.use("/todo",  todoRoutes);
router.use("/auth", authRoutes);

module.exports = router;