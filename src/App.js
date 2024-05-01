import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TodoItem from './TodoItem';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const url = 'http://localhost:3001/todos';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(url);
    setTasks(response.data);
  };


  const addTask = async () => {
    if (!newTask.trim()) return;

    await axios.post(url, { text: newTask });
    setNewTask('');
    fetchTasks();
  };

  const onEditText = async (id, editedText) => {
    await axios.put(`${url}/text`, { id, text: editedText });
    fetchTasks();
  };

  const onEditCompleted = async (task) => {
    await axios.put(`${url}/completed/?id=${task.id}`);
    fetchTasks();
  };

  const onDelete = async (id) => {
    await axios.delete(`${url}/?id=${id}`);
    fetchTasks();
  };

  return (
    <Container maxWidth="sm">
      <h1>To-Do List</h1>
      <TextField
        label="Add a new task"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
      />
      <Button variant="contained" color="primary" onClick={addTask} style={{ marginTop: 20 }}>
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onEditText={onEditText} onEditCompleted={onEditCompleted} onDelete={onDelete} />
        ))}
      </List>
    </Container>
  );
}

export default App;
