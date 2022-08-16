import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Reset } from './components/Reset';
import { Temperature } from './components/Temperature';
import { Humidifier } from './components/Humidifier';
import { Dehumidifer } from './components/Dehumidifer';
import { RelHumidity } from './components/RelHumidity';
import { Box } from '@mui/joy';
import { Outcomes } from './components/Outcomes';


export type Props = {
  userData: Data
  updateData: React.Dispatch<React.SetStateAction<Data>>
  defaults: {
    maxHumidity: number,
    relHumidity: number,
    temp: number,
    data: {
      temp: number,
      humidity: number,
      relHumidity: number,
    }
  }
}

export type Data = {
  temp: number;
  humidity: number;
  relHumidity: number

}


function App() {
  const defaults = {
    maxHumidity:4,
    relHumidity:33,
    temp: 15,
    data: {
      temp: 15,
      humidity: 2,
      relHumidity: 20
    }
  }
    
    const [localData, setLocalData] = useState<Data>(defaults.data)

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

      <RelHumidity userData={localData} updateData={setLocalData} defaults = {defaults}></RelHumidity>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Humidifier userData={localData} updateData={setLocalData} defaults = {defaults}></Humidifier>
        <Dehumidifer userData={localData} updateData={setLocalData} defaults = {defaults}></Dehumidifer>
        <Reset userData={localData} updateData={setLocalData} defaults = {defaults}></Reset>
      </Box>
      <Temperature userData={localData} updateData={setLocalData}defaults = {defaults}></Temperature>
      <Outcomes userData={localData} updateData={setLocalData}defaults = {defaults}></Outcomes>
    </div>
  );
}

export default App;
