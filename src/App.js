import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    // Replace '<your-api-id>', '<region>', and '<stage>' with your actual values
    // Fetch tasks from the API on component mount
    
    const fetchTasks = async ()=>{
        try {
            const response = await axios.get('https://l9trhjlgof.execute-api.ap-south-1.amazonaws.com/production/task'); // Replace with your API URL
            console.log('Fetched tasks:', response.data);
            if (response.status === 200 ) {
                setTasks(response.data);
            }
            else {
                console.error("Failed to fetch tasks:", response.statusText);

            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
    useEffect(() => {
    
        fetchTasks();
    }, []);
        

    // Function to add a new task
    const addTask = async (taskName) => {
        try {
            const uniqueId =Date.now().toString();
            
            const newTask = { 
                    taskId: uniqueId,
                    taskName: taskName,
                    completed:false 
            };
            const response = await axios.post('https://l9trhjlgof.execute-api.ap-south-1.amazonaws.com/production/task',newTask); // Replace with your API URL
            
            if (response.status === 201 || response.status === 200) {
                fetchTasks(); 
            } else {
                console.error('Failed to add task:', response.statusText);
            }
            
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Function to delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete('https://l9trhjlgof.execute-api.ap-south-1.amazonaws.com/production/task'+taskId ); // Replace with your API URL
            fetchTasks(); 
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Function to toggle task completion
    const toggleTask = async (taskId) => {
        const task = tasks.find(task => task.taskId === taskId);
        if (task) {
            try {
                await axios.put('https://l9trhjlgof.execute-api.ap-south-1.amazonaws.com/production/task/'+taskId,
                    {
                        taskID: taskId,
                        completed: !task.completed
                    }); // Replace with your API URL
                    fetchTasks(); // Update state with the toggled task
            } catch (error) {
                console.error('Error toggling task:', error);
            }
        }
    }

    return (
        <div className="App">
            <h1>To-Do Task Manager</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
            
        </div>
    );
};

export default App;

