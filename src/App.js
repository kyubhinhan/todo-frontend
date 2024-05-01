import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List } from '@material-ui/core';
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

  const onEditCompleted = async (id) => {
    await axios.put(`${url}/completed/${id}`);
    fetchTasks();
  };

  const onDelete = async (id) => {
    await axios.delete(`${url}/${id}`);
    fetchTasks();
  };

  return (
    <Container maxWidth="sm">
      <h1>To-Do List</h1>
      <TextField
        label="할 일을 추가하세요"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setTimeout(addTask, 150)
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={addTask} style={{ marginTop: 20 }}>
        할 일 추가
      </Button>
      <List>
        {tasks.map((task) => (
          <TodoItem key={task._id} task={task} onEditText={onEditText} onEditCompleted={onEditCompleted} onDelete={onDelete} />
        ))}
      </List>
    </Container>
  );
}

export default App;
