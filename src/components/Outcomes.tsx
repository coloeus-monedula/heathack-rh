import { CssVarsProvider } from '@mui/joy/styles';
import { Sheet } from '@mui/joy';
import { Box } from '@mui/system';
import { Data, Props } from '../App';
import { useEffect, useState } from 'react';
import '../App.css'
import { calculateCondensation } from '../util/calculations';

export function Outcomes({userData, updateData, defaults}:Props): JSX.Element {
    //0 is good, -1 is uncomfortable, -2 very uncomfortable
    const [comfort, setComfort] = useState<number>(0)
    const [isBuildingGood, setIsBuildingGood] = useState<boolean>(true)
    const [reachedDewpoint, setReachedDewpoint] = useState<boolean>(false)
    const [hasCondensation, setHasCondensation] = useState<boolean>(false)
    const [condensedUnits, setCondensedUnits] = useState<number>(0)
    const [humidityUnits, setHumidityUnits] = useState<number>(defaults.data.humidity)


    const outputDiscomfortReason = (): String => {
        const discomfortDegree:String = comfort === -2? "very" : "somewhat"
        const humidity:String = userData.relHumidity > 65? "humid" : "dry"
        const temp: String = userData.temp > 23? "hot" : "cold"

        return `Person is ${discomfortDegree} uncomfortable because it is too ${humidity} and ${temp}.`
    }

    useEffect(() => {
        const relHumidity = userData.relHumidity
        if (relHumidity === 100) {
            setReachedDewpoint(true)
        } else {
            setReachedDewpoint(false)
        }

        if (relHumidity >= 80) {
            setIsBuildingGood(false)
        } else {
            setIsBuildingGood(true)
        }

        if (relHumidity > 75 || relHumidity < 35) {
            setComfort(-2)
        } else if (relHumidity > 65 || relHumidity < 45) {
            setComfort(-1)
        } else if (relHumidity <=65 && relHumidity >=45) {
            setComfort(0)
        }

        const condensed = calculateCondensation(userData.temp, userData.humidity)
        console.log(condensed)
        // if (condensed > 0) {
        //     setHasCondensation(true)
        //     const newHumidity = userData.humidity - condensed
        //     const updatedData: Data = {
        //         ...userData,
        //         "humidity": newHumidity
        //     }
            
        //     updateData(updatedData)
        //     setCondensedUnits(condensed)
        //     setHumidityUnits(newHumidity)

        // } else {
        //     setHasCondensation(false)
        //     setHumidityUnits(userData.humidity)
        // }

        setHumidityUnits(userData.humidity)
    }, [userData.humidity, userData.relHumidity, userData.temp, updateData])

    return (
        //these will be svgs at some point
        //To add: explanation TextclassName="Outcome" 
        //have something for temp and something for humidity/dryness
        <CssVarsProvider>
            <Sheet className="Outcome"  variant='soft' sx={
                {width:'90%', height:'90%',padding: 'auto', margin:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', justifySelf:'end' }
                }>
                <Box id='HumidityInfo'>The air currently "holds" {humidityUnits} "unit(s)" of humidity. {hasCondensation && `${condensedUnits} "unit(s)" of humidity have become condensed due to lower temperatures.`}</Box>
                <Box id='Comfort'>{comfort<0? outputDiscomfortReason(): `Person feels comfortable.`}</Box>
                <Box id='Building'>{!isBuildingGood && `Building is at risk of damage.`}</Box>
                <Box id='Window'>{reachedDewpoint && `Dewpoint has been reached. This is very bad!`}</Box>
            </Sheet>
        </CssVarsProvider>
    )
}