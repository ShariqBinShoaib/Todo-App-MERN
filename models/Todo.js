const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createTodo = new Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskStatus: Boolean
});

module.exports = mongoose.model('Todo', createTodo);