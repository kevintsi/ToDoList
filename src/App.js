import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem/TodoItem';
import ProgressBar from './components/ProgressBar/ProgramBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [todos, setTodos] = useState([])
  const [inputTodo, setInputTodo] = useState("")
  const [barStyle, setBarStyle] = useState({ "width": 0, "color": "white" })

  /**
   * 
   * @param {Event} e
   * Executé lors d'un ajout d'une nouvelle tache
   * S'il y a dejà des taches, il l'ajoute à la liste sinon il créer la liste 
   */
  const _submit = (e) => {
    e.preventDefault()
    if (inputTodo.trim().length > 0) {
      let todo = {
        "name": inputTodo.trim(),
        "isDone": false
      }
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
      toast.success('Tache ajoutée', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInputTodo("")
    }
  }

  /**
   * 
   * @param {string} newTodo 
   * @param {int} id
   * 
   * Executé lors d'une modification d'une tache 
   */
  const _update = (newTodo, id) => {
    setTodos(
      todos.map((todo, idx) => {
        if (idx === id) {
          todo.name = newTodo
        }
        return todo
      })
    )
    toast.success('Tache modifiée avec succès', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const _removeAll = (e) => {
    e.preventDefault()
    if (localStorage.getItem("todos") !== null) {
      localStorage.removeItem("todos")
      setTodos([])
      toast.success('Reset effectuée', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    if (isNaN(width)) {
      setBarStyle({ "width": 0, "color": "white" })
    } else {
      if (width >= 70) { // Change la couleur en fonction de la width obtenue
        setBarStyle({ "width": width, "color": "#26C281" })
      } else if (width > 40 && width < 70) {
        setBarStyle({ "width": width, "color": "#F2784B" })
      } else {
        setBarStyle({ "width": width, "color": "#D05454" })
      }
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
      <ToastContainer />
      <div className="container">
        <div className="header">
          <ProgressBar barStyle={barStyle} />
          <form onSubmit={_submit}>
            <input
              type="text"
              value={inputTodo}
              placeholder="Entrez une nouvelle tache"
              onChange={(e) => setInputTodo(e.target.value)}
            />
            <button type="submit">Ajouter</button>
            <button type="button" onClick={_removeAll}>Reset</button>
          </form>
        </div>
        {todos.length > 0 ? (
          <ul>
            {
              todos.map(
                (todo, idx) => (
                  <TodoItem key={idx} todo={todo} id={idx} handleCheckboxChange={_handleCheckboxChange} update={_update} />
                )
              )
            }
          </ul>
        ) :
          <h3>Il n'y a aucune tache</h3>
        }
      </div>
    </div>
  );
}

export default App;
