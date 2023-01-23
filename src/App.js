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
      setColor("#26C281")
    } else if (width > 40 && width < 70) {
      setColor("#F2784B")
    } else {
      setColor("#D05454")
    }
  }, [selected, todos.length, width])

  const addTodo = (e) => {
    e.preventDefault()
    if (inputTodo.trim().length > 0) {
      console.log(localStorage.getItem("todos") !== null)
      if (localStorage.getItem("todos") !== null) {
        let todos = JSON.parse(localStorage.getItem("todos"))
        todos.push(inputTodo.trim())
        setTodos(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
      }
      else {
        localStorage.setItem("todos", JSON.stringify([inputTodo]))
        setTodos(state => [...state, inputTodo.trim()])
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
    <div className="todo-list">
      <h1>Liste des choses à faire</h1>
      <ProgressBar
        width={width}
        color={color}
      />
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputTodo}
          placeholder="Entrez une nouvelle tache"
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      {todos.length > 0 ? (
        <ul>
          {
            todos.map(
              (todo, idx) => (
                <TodoItem key={idx} todo={todo} id={idx} setSelected={setSelected} selected={selected} />
              )
            )
          }
        </ul>
      ) :
        <h3>Il n'y a aucune tache</h3>
      }

    </div>
  );
}

export default App;
