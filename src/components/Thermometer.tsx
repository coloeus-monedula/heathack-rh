import Slider from '@mui/joy/Slider';
import Box from '@mui/joy/Box';
import { CssVarsProvider } from '@mui/joy/styles';

import React, { useEffect, useState } from 'react';
import { Data, Props } from "../App";
import { calculateCondensation } from '../util/calculations';

export function Thermostat({userData, updateData, defaults}: Props) {
    //for (re)setting temp knob
    const [index, setIndex] = useState<number>(defaults.temp)

    const handleTempChange = (event: Event, value:number|number[]) : void => {
        if (!Array.isArray(value)){

            const updatedData: Data = {
              ...userData,
              "temp": value
            }
            updateData(updatedData)
        }
    }

    const handleCondensation = (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
      const condensation = calculateCondensation(userData.temp, userData.humidity)
      console.log("committed")
      //if condensation is more than 0
      const newHumidity = userData.humidity - condensation
      if (!Array.isArray(value)){

        const updatedData: Data = {
            "relHumidity": userData.relHumidity,
            "condensation": condensation,
            "humidity": newHumidity,
            "temp": value,
            "on":userData.on
        }
        updateData(updatedData)
      }
    
      
    }
   

    useEffect(() => {
        const temp = userData.temp
        const newIndex = temp
        setIndex(newIndex)
    },[userData, index])

    const valueText = (value: number) => `${value}°C`
    const marks = [
        {
            value: 5,
            label: '5°C',
          },
          {
            value: 10,
            label: '10°C',
          },
          {
            value: 15,
            label: '15°C',
          },
          {
            value: 20,
            label: '20°C',
          },
          {
            value: 25,
            label: '25°C',
          },
          {
            value:30,
            label:'30°C',
          },
    ]

    return (
        <CssVarsProvider>

            <Box sx={{ minHeight: 200, width: 100, position:'relative', margin:'10px 10px 10px 0px' }}>
                <Slider
                aria-label='Temperature'
                getAriaValueText={valueText}
                defaultValue={defaults.temp}
                min={5}
                max={30}
                step={2}
                name="Temperature"
                marks={marks}
                size = "lg"
                color="danger"
                orientation="vertical"   
                valueLabelFormat="°C" 
                onChange={handleTempChange}
                onChangeCommitted={handleCondensation}
                value={index}
                />
            </Box>
        </CssVarsProvider>
    )
}