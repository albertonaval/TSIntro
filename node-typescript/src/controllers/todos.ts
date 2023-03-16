
import { RequestHandler } from "express"

import { Todo } from '../models/todos'



const TODOS: Todo[] = []


export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text //Como se que lo traere es type string lo indica de esa manera.
    const newTodo = new Todo(Math.random().toString(), text)



    TODOS.push(newTodo)

    res.status(201).json({message: 'Created the todo', createdTodo: newTodo})
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({TODOS})
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {

    const todoId = req.params.id //id === porque es el nombre que le puse en la ruta.

    const updatedtext = (req.body as { text: string }).text

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if (todoIndex < 0) {
        throw new Error('Could not find todo')
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedtext)

    res.json({message: 'Updated!', updateTodo: TODOS[todoIndex]})

}


export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if (todoIndex < 0) {
        throw new Error('Could not find todo')
    }

    TODOS.splice(todoIndex, 1)

    res.json({ message: 'DeleteTodo'})

}





