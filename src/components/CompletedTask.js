import { FaTimes } from 'react-icons/fa'
import {BsCheckCircleFill} from 'react-icons/bs'

const CompletedTask = ({ task, onDelete, onToggle }) => {


  return (
    <div key={task.id} className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>
            {task.text} <FaTimes style={{ color:'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
        </h3>
          <p>{task.day}</p>
          <BsCheckCircleFill style={{color:'green'}} />
    </div>
  )
}

export default CompletedTask