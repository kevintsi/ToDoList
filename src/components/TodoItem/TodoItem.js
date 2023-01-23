import "./TodoItem.css"

const TodoItem = ({ todo, id, setSelected, selected }) => {

    const handleCheckboxChange = () => {
        if (selected.includes(id)) {
            setSelected(selected.filter(old_id => old_id !== id));
        } else {
            setSelected([...selected, id]);
        }
    }
    return (
        <li>
            <input
                type="checkbox"
                checked={selected.includes(id)}
                onChange={handleCheckboxChange}
            />
            <label style={selected.includes(id) ? { textDecorationLine: "line-through", fontStyle: "italic" } : null}>{id + 1}. {todo}</label>
        </li>
    )
}

export default TodoItem