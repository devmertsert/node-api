const express = require("express");
const app = express();

// import route add index route
const route = require("./routes");
app.use(route);

// handle 404 error
app.use("*", (req, res, next) => {
    res.status(404);
    res.json({
        "error": "Not found"
    });
});

const port = process.env.port || 3000;
app.listen(port, ()=> {
    console.clear();
    console.info("Server has started on PORT: " + port);
});