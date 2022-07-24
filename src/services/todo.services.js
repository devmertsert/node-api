const Todo = require("../models/todo.model");
const handleErrors = require("../helpers/handleErrors");

module.exports = {
    create: async (req) => {
        try {
            const {
                content
            } = req.body;

            const todo = new Todo({
                user: req.user,
                content
            });

            await todo.save();

            const todoData = await Todo.findById(todo._id).populate({
                path: 'user',
                select: '_id name surname'
            }).select('_id content createdAt updatedAt');

            return {
                code: 201,
                message: 'Todo has created successfully',
                status: 'success',
                data: todoData
            }
        } catch (error) {
            return handleErrors(error);
        }
    },

    list: async (req) => {
        try {
            const { user } = req;

            const todos = await Todo.find({ user }).populate({
                path: 'user',
                select: '_id name surname'
            }).select('_id content createdAt');

            return {
                code: 200,
                status: 'success',
                message: 'All data is fetched',
                data: todos
            }

        } catch (error) {
            return handleErrors(error);
        }
    }
}