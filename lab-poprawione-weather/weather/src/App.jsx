import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherAPI = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const latitude = 50.2584;
                const longitude = 19.0275;
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="weather-container">
            {weatherData && (
                <div>
                    <h2>Current Weather</h2>
                    <div className="current-weather">
                        <p>Temperature: {weatherData.current.temperature_2m}&deg;C</p>
                        <p>Wind Speed: {weatherData.current.wind_speed_10m} m/s</p>
                    </div>
                    <h2>Daily Forecast</h2>
                    <div className="daily-forecast">
                        {weatherData.daily.time.map((day, index) => (
                            <div key={index} className="daily-forecast-item">
                                <p>Date: {day}</p>
                                <p>Max Temperature: {weatherData.daily.temperature_2m_max[index]}&deg;C</p>
                                <p>Min Temperature: {weatherData.daily.temperature_2m_min[index]}&deg;C</p>
                                <p>Max Wind Speed: {weatherData.daily.wind_speed_10m_max[index]} m/s</p>
                                {index !== weatherData.daily.time.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!weatherData && <p>Loading...</p>}
        </div>
    );
};

export default WeatherAPI;
