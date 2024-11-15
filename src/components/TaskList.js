import React ,{useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = ({ tasks, deleteTask, toggleTask,updateTask }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleEditClick = (task) => {
        setIsEditing(task.taskId); // Set the task to be edited
        setEditValue(task.taskName); // Pre-fill the input with the current task name
    };
    // Handle save button click
    const handleSaveClick = (taskId) => {
        if (editValue.trim()) {
            updateTask(taskId, editValue); // Call the function to update the task
        }
        setIsEditing(null); // Reset editing state
    };


    return (
        <ul className="task-list">
            {tasks.map((task, index) => (
                <li key={task.taskId}>
                    <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => toggleTask(index,task.taskId)} 
                    />
                    {isEditing === task.taskId ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                        />
                    ) : (

                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.taskName}
                    </span>
                    )}
                    <button onClick={() => deleteTask(index,task.taskId)}><DeleteIcon /></button>

                     {isEditing === task.taskId ? (
                        <button onClick={() => handleSaveClick(task.taskId)}>Save</button>
                    ) : (
                    <button onClick={() => handleEditClick(task)}><EditIcon/></button>
                )}

                </li>
            ))}
        </ul>
    );
};

export default TaskList;
