import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onComplete }) => {
    return (
    <>
        {tasks.map((task, index) => (
            <Task 
                key={index} 
                task={task} 
                onDelete={onDelete} 
                onToggle={onToggle} 
                onComplete={onComplete}
            />
        ))}
    </>
  )
}

export default Tasks