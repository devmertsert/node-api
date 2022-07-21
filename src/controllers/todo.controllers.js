// import services
const Service = require("../services/todo.services");

module.exports = {
    list: (req, res) => {
        const response = Service.list(req);
        res.status(response.code).json(response);
    }
}