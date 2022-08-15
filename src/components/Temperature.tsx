import Slider from '@mui/joy/Slider';
import Box from '@mui/joy/Box';
import { CssVarsProvider } from '@mui/joy/styles';

import React, { useEffect, useState } from 'react';
import { Data, Props } from "../App";

export function Temperature({userData, updateData, defaults}: Props) {
    //for (re)setting temp knob
    const [index, setIndex] = useState<number>(defaults.temp)

    const handleTempChange = (event: Event|React.SyntheticEvent<Element, Event>, value:number|number[]) : void => {
        if (!Array.isArray(value)){
            const updatedData: Data = {
                ... userData,
                "temp": value
            }
            updateData(updatedData)
        }
    }
   

    useEffect(() => {
        console.log(userData)
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
          }
    ]

    return (
        <CssVarsProvider>

            <Box sx={{ height: 200, mx:'auto' }}>
                <Slider
                aria-label='Temperature'
                getAriaValueText={valueText}
                defaultValue={defaults.temp}
                min={5}
                max={30}
                name="Temperature"
                step={5}
                marks={marks}
                size = "lg"
                color="danger"
                orientation="vertical"   
                valueLabelFormat="°C" 
                onChange={handleTempChange}
                value={index}
                />
            </Box>
        </CssVarsProvider>
    )
}