import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Reset } from './components/Reset';
import { Data } from './util/userData';




function App() {
  const localData = new Data({
    temp: 20,
    humidity: 15
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Reset userData={localData} ></Reset>
      </header>
    </div>
  );
}

export default App;
