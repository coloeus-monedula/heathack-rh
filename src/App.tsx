import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Reset } from './components/Reset';
import Thermostat from './components/Thermostat';
import { Humidifier } from './components/Humidifier';
import { Dehumidifer } from './components/Dehumidifer';
import { RelHumidity } from './components/RelHumidity';
import { Box, Grid, Sheet } from '@mui/joy';
import { Outcomes } from './components/Outcomes';
import Heater from './components/Heater';


export type Props = {
  userData: Data
  updateData: React.Dispatch<React.SetStateAction<Data>>
  defaults: {
    maxHumidity: number,
    data: {
      temp: number,
      humidity: number,
      relHumidity: number,
      condensation: number,
      on: boolean
    }
  }
}

export type Data = {
  temp: number;
  humidity: number;
  relHumidity: number,
  condensation: number,
  on:boolean,

}


function App() {
  const defaults = {
    maxHumidity:6,
    data: {
      temp: 15,
      humidity: 3,
      relHumidity: 33,
      condensation: 0,
      on: false,
    }
  }
    
    const [localData, setLocalData] = useState<Data>(defaults.data)

  return (
    <Grid className="App">

      <Outcomes userData={localData} updateData={setLocalData}defaults = {defaults}></Outcomes>
      <Sheet sx={{display: 'inline-flex', margin: '10px', width: 400}}>
        <RelHumidity userData={localData} updateData={setLocalData} defaults = {defaults}></RelHumidity>
        <Thermostat userData={localData} updateData={setLocalData}defaults = {defaults}></Thermostat>
      </Sheet>
      <Sheet variant="outlined" id="Controls">
        <Box id="HumidityControls">
          <Humidifier userData={localData} updateData={setLocalData} defaults = {defaults}></Humidifier>
          <Dehumidifer userData={localData} updateData={setLocalData} defaults = {defaults}></Dehumidifer>
          <Reset userData={localData} updateData={setLocalData} defaults = {defaults}></Reset>
        </Box>
        <Heater userData={localData} updateData={setLocalData} defaults={defaults}/>
      </Sheet>
    </Grid>

  );
}

export default App;
