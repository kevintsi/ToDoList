import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem/TodoItem';
import ProgressBar from './components/ProgressBar/ProgramBar';

function App() {
  const [todos, setTodos] = useState([])
  const [inputTodo, setInputTodo] = useState("")
  const [selected, setSelected] = useState([])
  const [width, setWidth] = useState(0)
  const [color, setColor] = useState("")

  useEffect(() => {
    // Executé quand la liste selected est modifiée
    console.log(selected)
    console.log(selected.length / todos.length * 100)
    setWidth(selected.length / todos.length * 100)
    if (width >= 70) {
      setColor("green")
    } else if (width > 40 && width < 70) {
      setColor("orange")
    } else {
      setColor("red")
    }
  }, [selected, todos.length, width])

  const addTodo = () => {
    if (inputTodo.trim().length > 0) {
      console.log(localStorage.getItem("todos") !== null)
      if (localStorage.getItem("todos") !== null) {
        let todos = JSON.parse(localStorage.getItem("todos"))
        todos.push(inputTodo)
        setTodos(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
      }
      else {
        localStorage.setItem("todos", JSON.stringify([inputTodo]))
        setTodos(state => [...state, inputTodo])
      }
      setInputTodo("")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("todos") !== null) {
      setTodos(JSON.parse(localStorage.getItem("todos")))
    }
  }, [])


  return (
    <div className="App">
      <h1>Liste de choses à faire</h1>
      <ProgressBar width={width} color={color} />
      <input type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
      <button onClick={addTodo}>Ajouter</button>
      {todos.map((todo, idx) => <TodoItem key={idx} todo={todo} id={idx} setSelected={setSelected} selected={selected} />)}
    </div>
  );
}

export default App;
