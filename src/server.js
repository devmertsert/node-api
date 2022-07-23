// load .env
const dotenv = require("dotenv");
dotenv.config();

// create app
const express = require("express");
const app = express();
const cors = require("cors");

// MongoDB connection
require("./config/mongodb.config");

// import middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import route add index route
const route = require("./routes");
app.use(route);

// handle 404 error
const { handleErrors } = require("./helpers/handleErrors");
app.use("*", (req, res, next) => {
    const error = handleErrors({ name: "endpointDoesNotExist" });
    res.status(error.code).json(error);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.clear();
    console.info('Server has started on PORT: ' + port + ' at "' + new Date().toUTCString() + '"');
});