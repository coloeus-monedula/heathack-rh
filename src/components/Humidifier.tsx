import { useEffect } from "react";
import { Button } from "@mui/joy";
import { CssVarsProvider } from '@mui/joy/styles';
import { useState } from "react";
import { Data, Props } from "../App";
import { calculateMaxHumidity } from "../util/calculations";
import '../App.css'


export function Humidifier({userData, updateData, defaults} : Props) {
    const [maxHumidity, setMaxHumidity] = useState<number>(defaults.maxHumidity)
    const [canClick, setCanClick] = useState<boolean>(true)

    const handleAddHumidity = () : void => {
        const humidity = userData.humidity
        if (humidity < maxHumidity) {
            const updatedData : Data = {
                ... userData,
                'humidity': humidity+1
            }

            updateData(updatedData)
        }
    }

    //auto updates maxHumidity and whether or not button can be clicked
    useEffect(() => {
        const temp = userData.temp
        const humidity = userData.humidity
        setMaxHumidity(calculateMaxHumidity(temp))

        if (humidity >= maxHumidity) {
            setCanClick(false)
        } else {
            setCanClick(true)
        }

    },[maxHumidity, userData])


    return(
        <CssVarsProvider>
            {canClick
                ? <Button onClick={handleAddHumidity} variant="soft" size="lg">Humidifier</Button>
                : <Button onClick={handleAddHumidity} disabled variant="soft" size="lg">Humidifier</Button>
            }
        </CssVarsProvider>
    )
    
}