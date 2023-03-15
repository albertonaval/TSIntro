import React from 'react'

import './TodoList.css'

interface TodoListProps{
    items: { id: string, text: string }[] //Se añade el [] al final porque le indica que es un Array de Objetos
    onDeleteTodo: (id: string) => void
}


const TodoList: React.FC<TodoListProps> = props => {

    return (
        <ul>
            {props.items.map(todo =>
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={props.onDeleteTodo.bind(null, todo.id)}>DELETE</button>
                    </li>)}
        </ul>
)
}

export default TodoList