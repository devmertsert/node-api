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

            let todos = await Todo.find({ user }).populate({
                path: 'user',
                select: '_id name surname'
            }).select('_id content createdAt updatedAt');

            if(Object.keys(todos).length === 0) todos = null;

            return {
                code: 200,
                status: 'success',
                message: todos ? 'All data is fetched' : 'No data has been created',
                data: todos || {}
            }

        } catch (error) {
            return handleErrors(error);
        }
    },

    getById: async (req) => {
        try {
            const { id } = req.params;

            const todo = await Todo.findById(id).populate({
                path: 'user',
                select: '_id name surname'
            }).select('_id content createdAt updatedAt');

            return {
                code: 200,
                status: 'success',
                message: todo ? 'todo is fetched' : 'There is no todo with this id',
                data: todo || {}
            }
        } catch (error) {
            return handleErrors(error);
        }
    },

    update: async (req) => {
        try {
            const { id } = req.params;
            const { content } = req.body;

            const todo = await Todo.findByIdAndUpdate(id, {
                content
            }, {
                new: true,
                runValidators: true,
                context: 'query'
            }).populate({
                path: 'user',
                select: '_id name surname'
            }).select('_id content createdAt');
            
            return {
                code: 200,
                status: 'success',
                message: todo ? 'todo is updated' : 'There is no todo with this id',
                data: todo || {}
            }
        } catch (error) {
            return handleErrors(error);
        }
    },

    delete: async (req) => {
        try {
            const { id } = req.params;
            
            const todo = await Todo.findByIdAndDelete(id);

            return {
                code: 200,
                status: 'success',
                message: todo ? 'todo is deleted' : 'There is no todo with this id',
                data: todo || {}
            }
        } catch (error) {
            return handleErrors(error);
        }
    }
}