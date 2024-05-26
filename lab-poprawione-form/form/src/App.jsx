// FormularzRejestracji.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './App.css'

const FormularzRejestracji = () => {
    const [formData, setFormData] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        haslo: '',
        powtorzHaslo: ''
    });

    const [loginData, setLoginData] = useState({
        email: '',
        haslo: ''
    });

    const [loginMessage, setLoginMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        for (const key in formData) {
            if (formData[key] === '') {
                window.alert(`Uzupełnij ${key}`);
                valid = false;
            }
        }

        const emailTemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailTemplate.test(formData.email)) {
            window.alert('Niepoprawny adres email.');
            valid = false;
        }

        const passwordTemplate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{14,}$/;
        if (!passwordTemplate.test(formData.haslo)) {
            window.alert('Hasło musi mieć co najmniej 14 znaków, dużą literę, małą literę i cyfrę.');
            valid = false;
        }

        if (formData.haslo !== formData.powtorzHaslo) {
            window.alert('Hasła są różne');
            valid = false;
        }

        if (valid) {
            console.log('Ok', formData);

            // Zapisywanie danych użytkownika do Local Storage
            localStorage.setItem('userData', JSON.stringify(formData));
            setLoginMessage('Dane użytkownika zapisane w Local Storage.');
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Obsługa logowania użytkownika
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            const { email, haslo } = storedUserData;
            if (email === loginData.email && haslo === loginData.haslo) {
                setLoginMessage('Zalogowano pomyślnie.');
            } else {
                setLoginMessage('Nieprawidłowy email lub hasło.');
            }
        } else {
            setLoginMessage('Brak danych użytkownika w Local Storage. Musisz się najpierw zarejestrować.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imię:</label>
                    <input type="text" name="imie" value={formData.imie} onChange={handleChange} />
                </div>
                <div>
                    <label>Nazwisko:</label>
                    <input type="text" name="nazwisko" value={formData.nazwisko} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input type="password" name="haslo" value={formData.haslo} onChange={handleChange} />
                </div>
                <div>
                    <label>Powtórz hasło:</label>
                    <input type="password" name="powtorzHaslo" value={formData.powtorzHaslo} onChange={handleChange} />
                </div>
                <button type="submit">Zarejestruj się</button>
            </form>

            <div className={loginMessage.startsWith('Zalogowano') ? "success-message" : "error-message"}>
                {loginMessage}
            </div>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input type="password" name="haslo" value={loginData.haslo} onChange={handleLoginChange} />
                </div>
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
    );
};

export default FormularzRejestracji;
