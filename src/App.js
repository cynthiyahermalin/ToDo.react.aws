import React, { useState ,useEffect } from 'react';
import axios from 'axios'; // Import axios
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import {API_URL} from './utils.js';
const App = () => {
    const [tasks, setTasks] = useState([]);
    // Replace '<your-api-id>', '<region>', and '<stage>' with your actual values
    // Fetch tasks from the API on component mount
    const[editValue,setIsEditing]=useState([]);

    const fetchTasks = async ()=>{
        try {
            const response = await axios.get(API_URL); // Replace with your API URL
            
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
                    taskName,
                    completed:false 
            };
            const response = await axios.post(API_URL,newTask); // Replace with your API URL
            
            if (response.status === 201 || response.status === 200) {
                fetchTasks(); 
                
            } else {
                console.error('Failed to add task:', response.statusText);
            }
            
        } catch (error) {
            console.error('Error adding task:', error);
        }
        const newTask={taskName: taskName,completed: false }
        setTasks([...tasks, newTask]);
        
    };
    // Function to delete a task
    const deleteTask = async (index,taskId) => {
        try {
            await axios.delete(`${API_URL}/${taskId}`); // Replace with your API URL
            fetchTasks(); 
        } catch (error) {
            console.error('Error deleting task:', error);
        }
        const newTask = tasks.filter((_, i) => i !== index);
        setTasks(newTask);
    };
    // Function to toggle task completion
    const toggleTask = async (index,taskId)  => {
        const task = tasks.find(task => task.taskId === taskId);
        if (task) {
            try {
                await axios.put(`${API_URL}/${taskId}`,
                    {
                        taskID: taskId,
                        completed: !task.completed
                    }); // Replace with your API URL
                    fetchTasks(); // Update state with the toggled task
                    const newTask = tasks.map((task, i) => {
                        if (i === index) {
                            return { ...task, completed: !task.completed };
                        }
                        return task;
                    });
                    setTasks(newTask);
                } catch (error) {
                    console.error('Error toggling task:', error);
                }
            }
    };

    const handleSaveClick = async (taskId) => {
        try {
          // Create an object for the updated task
          const updatedTask = {
            taskId,
            taskName: editValue, // Update the value
          };
      
          // Make a PUT request to update the task
          await axios.put(`${API_URL}/${taskId}`, updatedTask);
      
          // Fetch and update the task list (or update the local state)
          fetchTasks();
      
          // Reset editing state
          setIsEditing(null);
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
      
    
    return (
        <div className="App">
            <h1>To-Do Task Manager</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} updateTask={handleSaveClick} />
            
        </div>
    );
};

export default App;



