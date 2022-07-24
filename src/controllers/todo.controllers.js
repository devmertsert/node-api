// import services
const Service = require("../services/todo.services");

module.exports = {
    create: async (req, res) => {
        const response = await Service.create(req);
        res.status(response.code).json(response);
    },

    list: async (req, res) => {
        const response = await Service.list(req);
        res.status(response.code).json(response);
    }
}