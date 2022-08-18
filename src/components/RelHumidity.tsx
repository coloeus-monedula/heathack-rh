import { CssVarsProvider, Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Data, Props } from "../App";
import { calculateRelHumidity } from "../util/calculations";

export function RelHumidity({userData, updateData, defaults}: Props){
    //this number gets overriden pretty much immediately but still good to keep
    const [relHumidity, setRelHumidity] = useState<number>(defaults.relHumidity)

    useEffect(() =>{
        const newRelHumidity = calculateRelHumidity(userData.temp, userData.humidity)
        setRelHumidity(newRelHumidity)
        const updatedData: Data = {
            ...userData,
            relHumidity: newRelHumidity
        }

        updateData(updatedData)
    },[userData, updateData])

    return (
        <CssVarsProvider>
            <Box sx={{position:'relative', width:300, margin:'10px', display: 'span', alignSelf:'end'}}>
                <Typography level="h5">
                    Relative Humidity
                </Typography>
                <ReactSpeedometer
                minValue={0}
                maxValue={100}
                value={relHumidity}
                startColor="#abdbe3"
                endColor="#154c79"
                segments={1000}
                maxSegmentLabels={5}
                currentValueText= "${value}%"
                height={200}
                />
            </Box>

        </CssVarsProvider>
    )
}