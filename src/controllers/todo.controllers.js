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
    },

    getById: async (req, res) => {
        const response = await Service.getById(req);
        res.status(response.code).json(response);
    },

    update: async (req, res) => {
        const response = await Service.update(req);
        res.status(response.code).json(response);
    },

    delete: async (req, res) => {
        const response = await Service.delete(req);
        res.status(response.code).json(response);
    }
}