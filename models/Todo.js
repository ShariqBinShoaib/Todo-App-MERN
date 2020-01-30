const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createTodo = new Schema({
    taskTitle: {
        type: String,
        required: true,
        minlength: 3
    },
    taskStatus: Boolean
});

module.exports = mongoose.model('Todo', createTodo);