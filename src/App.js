import Header from "./Components/Header"
import Tasks from "./Components/Tasks"
import { useState, useEffect } from 'react'
import AddTask from "./Components/AddTask"
import About from "./Components/About"
import Footer from "./Components/Footer"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {

 const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

 const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()    
      return data
    }



  const addTask = async (task) => {
   
    const res = await fetch('http://localhost:5000/tasks', 
      {method: 'POST',
       headers: {
        'content-type': 'application/json',
       },
       body:JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])

    //    const id = Math.floor(Math.random() * 100000) + 1
    //    const newTask = {id,...task}
    // //...task means copying over the input task data (text & day)
    //    setTasks ([...tasks, newTask])
    //calling setTask function, setting new array of tasks, 
    //copying the oldtasks over and adding in the new one.

  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',   
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className= 'container' >
      <Header onAdd = {() => setShowAddTask(!showAddTask)} 
      showAdd = {showAddTask} />
      
      <Routes>
      <Route path ='/' element = {
        <>
          {showAddTask ? <AddTask onAdd={addTask} /> : '' }
          {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No Tasks!'}
        </>
        }
        />

      <Route path ='/about' element = {<About/>} />
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App
