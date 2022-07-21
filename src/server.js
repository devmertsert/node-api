const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200);
    res.send("Hello World!");
});

const port = process.env.port || 3000;
app.listen(port, ()=> {
    console.clear();
    console.info("Server has started on PORT: " + port);
});