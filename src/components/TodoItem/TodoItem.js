import { useState } from "react"
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"
import "./TodoItem.css"

const TodoItem = ({ todo, id, handleCheckboxChange, update }) => {
    const [inputMode, setInputMode] = useState(false)
    const [newTodo, setNewTodo] = useState(todo.name)

    const handleClick = (e) => {
        setInputMode(!inputMode)
        if (newTodo.trim().length > 0 && newTodo !== todo.name) {
            update(newTodo, id)
        }
    }
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => handleCheckboxChange(id)}
            />
            {
                inputMode ?
                    <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} /> :
                    <label style={todo.isDone ? { textDecorationLine: "line-through", fontStyle: "italic" } : null}>{id + 1}. {todo.name}</label>
            }


            <div className="edit">
                {
                    inputMode ?
                        <>
                            <RxCross1 onClick={e => setInputMode(!inputMode)} />
                            <AiOutlineCheck onClick={handleClick} />
                        </>
                        :
                        <AiFillEdit onClick={e => setInputMode(!inputMode)} />
                }

            </div>
        </li>
    )
}

export default TodoItem