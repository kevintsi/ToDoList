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

  /**
   * 
   * @param {Event} e
   * Executé lors d'un ajout d'une nouvelle tache
   * S'il y a dejà des taches, il l'ajoute à la liste sinon il créer la liste 
   */
  const _addTodo = (e) => {
    e.preventDefault()
    if (inputTodo.trim().length > 0) {
      let todo = {
        "name": inputTodo.trim(),
        "isDone": false
      }
      console.log(localStorage.getItem("todos") !== null)
      if (localStorage.getItem("todos") !== null) {
        let todos = JSON.parse(localStorage.getItem("todos"))
        todos.push(todo)
        setTodos(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
      }
      else {
        localStorage.setItem("todos", JSON.stringify([todo]))
        setTodos(state => [...state, todo])
      }
      setInputTodo("")
    }
  }

  /**
   * 
   * @param {int} id
   * Executé lorsqu'une case est cochée. Change l'état de la propriété isDone de la tache
   * avec id avec son opposé
   */
  const _handleCheckboxChange = (id) => {
    setTodos(
      todos.map((todo, idx) => {
        if (idx === id) {
          todo.isDone = !todo.isDone
          return todo
        } else {
          return todo
        }
      })
    )
    localStorage.setItem("todos", JSON.stringify(todos))
    setSelected(todos.filter((todo) => todo.isDone === true))
  }

  /**
   * Executé lorsqu'une tache est cochée ou décochée
   * Met a jour la barre de progression
   */
  useEffect(() => {
    setWidth(Math.round(selected.length / todos.length * 100)) // Change la taille de barre de progression (nombre de tache selectionné / total tache)
    if (width >= 70) { // Change la couleur en fonction de la width obtenue
      setColor("#26C281")
    } else if (width > 40 && width < 70) {
      setColor("#F2784B")
    } else {
      setColor("#D05454")
    }
  }, [selected, todos.length, width])

  /**
   * Executé lors du chargement des composants
   * Récupère les taches à faire et déjà faites
   */
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
      <form onSubmit={_addTodo}>
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
                <TodoItem key={idx} todo={todo} id={idx} handleCheckboxChange={_handleCheckboxChange} />
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
