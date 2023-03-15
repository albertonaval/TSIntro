import React from 'react'

interface TodoListProps{
    items: {id: string, text: string}[] //Se añade el [] al final porque le indica que es un Array de Objetos
}

const TodoList: React.FC<TodoListProps> = props => {

    return (
        <ul>
            {props.items.map(todo =>
        <li key={todo.id}>{todo.text}</li>)}
        </ul>
)
}

export default TodoList