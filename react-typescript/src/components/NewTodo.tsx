import React, { useRef } from "react";
import './NewTodo.css'


interface NewTodoProps  {
    onAddTodo: (todoText: string) => void
}

const NewTodo: React.FC<NewTodoProps> = props => {
let textInputRef = useRef<HTMLInputElement>(null) //Se añade null porque caundo el componente se monta no hay nada.

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        let enteredText = textInputRef.current!.value
        props.onAddTodo(enteredText)
        textInputRef.current!.value = ""
    }
    return (
        <form onSubmit={todoSubmitHandler}>
            <div>
                <label htmlFor="todo-text">TODO TEXT</label>
                <input type="text" id="todo-text" ref={ textInputRef} />
            </div>
            <button type="submit">ADD TODO</button>
        </form>
    )
}

export default NewTodo