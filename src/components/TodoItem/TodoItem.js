import "./TodoItem.css"

const TodoItem = ({ todo, id, handleCheckboxChange }) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => handleCheckboxChange(id)}
            />
            <label style={todo.isDone ? { textDecorationLine: "line-through", fontStyle: "italic" } : null}>{id + 1}. {todo.name}</label>
        </li>
    )
}

export default TodoItem