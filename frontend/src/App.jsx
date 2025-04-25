import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:8080/api/hello')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Error connecting to the backend');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spring Boot + React Application</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App; 