"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text; //Como se que lo traere es type string lo indica de esa manera.
    const newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id; //id === porque es el nombre que le puse en la ruta.
    const updatedtext = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOS[todoIndex] = new todos_1.Todo(TODOS[todoIndex].id, updatedtext);
    res.json({ message: 'Updated!', updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'DeleteTodo' });
};
exports.deleteTodo = deleteTodo;
