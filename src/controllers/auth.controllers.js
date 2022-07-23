// import services
const Service = require("../services/auth.services");

module.exports = {
    signin: async (req, res) => {
        const response = await Service.signin(req);
        res.status(response.code).json(response);
    }
}