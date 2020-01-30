const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const Todo = require('../../models/Todo');

// GET API
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().select({ taskTitle: 1, taskStatus: 1 });
        if (!todos) return res.status(404).send('No Todo Found!');
        console.log(todos);
        res.send(todos);
    } catch (error) {
        console.log(error);
    }
});

//POST API
router.post('/add', async (req, res) => {
    const { error } = validateTodos(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    newTodo = {
        taskTitle: req.body.taskTitle,
        taskStatus: req.body.taskStatus
    }
    const todo = new Todo(newTodo);
    try {
        const result = await todo.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//PUT API
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).send('No such todo exist!');

        todo.taskStatus = req.body.taskStatus;
        const result = await todo.save();
        console.log(result);
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//DELETE API
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndRemove(req.params.id);
        if (!todo) return res.status(404).send('No such todo exist!');
        res.send(todo);
    } catch (error) {
        console.log(error);
    }
})

//Validations

function validateTodos(todo) {
    const schema = {
        taskTitle: Joi.string().min(3).required(),
        taskStatus: Joi.required()
    };

    return Joi.validate(todo, schema);
}

module.exports = router;