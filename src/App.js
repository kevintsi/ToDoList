import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem/TodoItem';
import ProgressBar from './components/ProgressBar/ProgramBar';

function App() {

  const [todos, setTodos] = useState([])
  const [inputTodo, setInputTodo] = useState("")
  const [barStyle, setBarStyle] = useState({})

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
        }
        return todo
      })
    )
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  /**
   * Executé lorsqu'une tache est cochée ou décochée
   * Met a jour la barre de progression
   */
  useEffect(() => {
    console.log("Update progress bar")
    let selecteds = todos.filter((todo) => todo.isDone === true)
    let width = Math.round(selecteds.length / todos.length * 100)// Change la taille de barre de progression (nombre de tache selectionné / total tache)
    if (width >= 70) { // Change la couleur en fonction de la width obtenue
      setBarStyle({ "width": width, "color": "#26C281" })
    } else if (width > 40 && width < 70) {
      setBarStyle({ "width": width, "color": "#F2784B" })
    } else {
      setBarStyle({ "width": width, "color": "#D05454" })
    }
  }, [todos])

  /**
   * Executé lors du chargement des composants
   * Récupère les taches à faire et déjà faites
   */
  useEffect(() => {
    console.log("Loading todos...")
    if (localStorage.getItem("todos") !== null) {
      setTodos(JSON.parse(localStorage.getItem("todos")))
    }
  }, [])

  return (
    <div className="todo-list">
      <div className="title">Liste des choses à faire</div>
      <ProgressBar barStyle={barStyle} />
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
