import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Reset } from './components/Reset';
import { Temperature } from './components/Temperature';
import { Humidifier } from './components/Humidifier';
import { Dehumidifer } from './components/Dehumidifer';
import { RelHumidity } from './components/RelHumidity';


export type Props = {
  userData: Data
  updateData: React.Dispatch<React.SetStateAction<Data>>
  defaults: {
    maxHumidity: number,
    relHumidity: number,
    tempKnobIndex: number,
    data: {
      temp: number,
      humidity: number
    }
  }
  reset?: boolean,
  setReset?: React.Dispatch<React.SetStateAction<boolean>>
}

export type Data = {
  temp: number;
  humidity: number;

}


function App() {
  const defaults = {
    maxHumidity:3,
    relHumidity:33,
    tempKnobIndex: 3,
    data: {
      temp: 15,
      humidity: 1
    }
  }
    
    const [localData, setLocalData] = useState<Data>({
      temp: 15,
      humidity: 1
    })

    const [reset, setReset] = useState<boolean>(false)


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

      <Reset userData={localData} updateData={setLocalData} setReset={setReset} reset = {reset} defaults = {defaults}></Reset>
      <Temperature userData={localData} updateData={setLocalData} reset={reset} setReset={setReset} defaults = {defaults}></Temperature>
      <Humidifier userData={localData} updateData={setLocalData} defaults = {defaults}></Humidifier>
      <Dehumidifer userData={localData} updateData={setLocalData} defaults = {defaults}></Dehumidifer>
      <RelHumidity userData={localData} updateData={setLocalData} defaults = {defaults}></RelHumidity>
    </div>
  );
}

export default App;
