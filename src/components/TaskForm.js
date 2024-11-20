import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleAddTask = () => {
        
        if (task.trim() !== '') {
            addTask(task);
            setTask('');
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={task}
                onChange={handleInputChange}
                placeholder="Add a new task..."
            />
            <button className="green-button"
             onClick={handleAddTask}>Add Task</button>
        </div>
    );
};

export default TaskForm;
