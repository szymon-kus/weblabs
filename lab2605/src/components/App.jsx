// App.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import Form from "./Form";

const App = () => {
    const handleRegister = (formData) => {
        // Saving data to localStorage
        localStorage.setItem("userData", JSON.stringify(formData));
        alert("Registration successful!");
    };

    return (
        <div>
            <h1>Registration Form</h1>
            <Form onRegister={handleRegister} />
        </div>
    );
};

export default App;
