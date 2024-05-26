// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "/Users/szymonkus/Desktop/Projekty IT/web dev/webapp/src/components/Form.jsx";
import LoginForm from "/Users/szymonkus/Desktop/Projekty IT/web dev/webapp/src/components/Login.jsx";
import TaskList from "/Users/szymonkus/Desktop/Projekty IT/web dev/webapp/src/components/TaskList.jsx";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleRegister = (formData) => {
        console.log("Register data:", formData);
        localStorage.setItem(formData.email, JSON.stringify(formData));
    };

    const handleLogin = (formData) => {
        const storedUser = JSON.parse(localStorage.getItem(formData.email));
        if (
            storedUser &&
            storedUser.email === formData.email &&
            storedUser.password === formData.password
        ) {
            setLoggedIn(true);
        } else {
            alert("Invalid login credentials");
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    {loggedIn ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" href="/register">
                                Register
                            </Button>
                            <Button color="inherit" href="/login">
                                Login
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Routes>
                    <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route
                        path="/tasks"
                        element={loggedIn ? <TaskList /> : <Navigate to="/login" />}
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
