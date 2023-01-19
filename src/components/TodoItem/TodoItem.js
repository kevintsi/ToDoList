const TodoItem = ({ todo, id, setSelected, selected }) => {

    const handleCheckboxChange = () => {
        if (selected.includes(id)) {
            setSelected(selected.filter(old_id => old_id !== id));
        } else {
            setSelected([...selected, id]);
        }
    }
    return (
        <div>
            <input
                type="checkbox"
                checked={selected.includes(id)}
                onChange={handleCheckboxChange}
            />
            <label>{todo}</label>
        </div>
    )
}

export default TodoItem