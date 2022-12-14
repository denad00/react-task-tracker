import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle, onComplete }) => {


  return (
    <div key={task.id} className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>
            {task.text} <FaTimes style={{ color:'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
        </h3>
          <p>{task.day}</p>
          <div className='form-control form-control-check'>
            <label>Completed?</label>
            <input onClick={() => onComplete(task.id)}
                type="checkbox" 
                />
          </div>
    </div>
  )
}

export default Task