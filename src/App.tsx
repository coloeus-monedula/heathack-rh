import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Reset } from './components/Reset';
import { Data } from './util/userData';
import { Temperature } from './components/TempDial';




function App() {
  const localData = new Data({
    temp: 20,
    humidity: 15
  })

  return (
    <div className="App">
      {/* <header className="App-header">
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
        
      </header> */}

      <Reset userData={localData} ></Reset>
      <Temperature userData={localData}></Temperature>
    </div>
  );
}

export default App;
