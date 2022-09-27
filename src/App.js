import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import CompletedTasks from './components/CompletedTasks'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  },[])

  useEffect(() => {
    getTasks()
  }, [getTasks])




  // Fetch Tasks
  const fetchTasks = async () => {
    // I had to change the url for the fetch as my machine wasn't giving me access when I used 'http://localhost:5000/tasks' 
    const res = await fetch('http://127.0.0.1:5000/tasks')
    const data = await res.json()


    return data.filter(tasks => tasks.completed === false)


  }

    // Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }


    // Add Task
    const addTask = async (task) => {
     const res = await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }


  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
      )
    )
  }

  //Complete Task
  const taskCompleted = async (id) => {
    const taskToComplete = await fetchTask(id)
    const updTask = { ...taskToComplete, completed: !taskToComplete.completed}

    const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    if(data.completed){
      getTasks()
    }

  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Routes>
          <Route
            exact path='/'
            element={
              <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onComplete={taskCompleted}/>
              ) : (
                'No Tasks to Show'
              )}
            </>
            }
          />
          <Route exact path='/about' element={<About />} />
          <Route 
            exact 
            path='/completedtasks' 
            element={
              <>
              {tasks.length > 0 ? (
              <CompletedTasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onComplete={taskCompleted}/>
              ) : (
                <Link to="/">Go Back</Link>
              )}
              </>
          } 
          />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
