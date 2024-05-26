// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
    Typography,
    Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleToggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <Container component="main" maxWidth="md" className="container">
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Task List
                </Typography>
                <TextField
                    label="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    onClick={handleAddTask}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Add Task
                </Button>
                <List sx={{ mt: 2 }}>
                    {tasks.map((task) => (
                        <ListItem key={task.id} dense>
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                            />
                            <ListItemText
                                primary={task.text}
                                sx={{ textDecoration: task.completed ? "line-through" : "none" }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TaskList;
