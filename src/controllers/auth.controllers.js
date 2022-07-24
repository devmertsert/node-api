// import services
const Service = require("../services/auth.services");

module.exports = {
    signup: async (req, res) => {
        const response = await Service.signup(req);
        res.status(response.code).json(response);
    },
    signin: async (req, res) => {
        const response = await Service.signin(req);
        res.status(response.code).json(response);
    }
}