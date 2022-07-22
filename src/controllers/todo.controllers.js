// import services
const Service = require("../services/todo.services");

module.exports = {
    list: async (req, res) => {
        const response = await Service.list(req);
        res.status(response.code).json(response);
    }
}