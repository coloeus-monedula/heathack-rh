import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Reset } from './components/Reset';
import { Temperature } from './components/Temperature';
import { Humidifier } from './components/Humidifier';
import { Dehumidifer } from './components/Dehumidifer';
import { RelHumidity } from './components/RelHumidity';
import { Box, Grid, Sheet } from '@mui/joy';
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
    <Grid className="App">

      <RelHumidity userData={localData} updateData={setLocalData} defaults = {defaults}></RelHumidity>
      <Outcomes userData={localData} updateData={setLocalData}defaults = {defaults}></Outcomes>
      <Sheet variant="outlined" sx={{display: 'inline-flex', minHeight:'220px', margin:'10px', justifyContent:'space-around', padding:'10px', width: 300}}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection:'column', maxWidth:"100px", margin: '0px 20px', justifyContent:'center' }}>
          <Humidifier userData={localData} updateData={setLocalData} defaults = {defaults}></Humidifier>
          <Dehumidifer userData={localData} updateData={setLocalData} defaults = {defaults}></Dehumidifer>
          <Reset userData={localData} updateData={setLocalData} defaults = {defaults}></Reset>
        </Box>
      <Temperature userData={localData} updateData={setLocalData}defaults = {defaults}></Temperature>
      </Sheet>
    </Grid>
  );
}

export default App;
