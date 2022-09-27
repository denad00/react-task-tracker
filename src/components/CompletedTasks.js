import CompletedTask from './CompletedTask'
import { Link } from 'react-router-dom'

const CompletedTasks = ({ tasks, onDelete, onToggle, onComplete }) => {
    return (
    <>
        {tasks.map((task, index) => (
            <CompletedTask 
                key={index} 
                task={task} 
                onDelete={onDelete} 
                onToggle={onToggle} 
                onComplete={onComplete}
            />
        ))}

        <Link to="/">Go Back</Link>
    </>
  )
}

export default CompletedTasks