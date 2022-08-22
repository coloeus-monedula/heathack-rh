import { CssVarsProvider } from '@mui/joy/styles';
import { Sheet } from '@mui/joy';
import { Box } from '@mui/system';
import { Data, Props } from '../App';
import { useEffect, useState } from 'react';
import '../App.css'
import { calculateMaxHumidity } from '../util/calculations';

export function Outcomes({userData, updateData}:Props): JSX.Element {
    //0 is good, -1 is uncomfortable, -2 very uncomfortable
    const [comfort, setComfort] = useState<number>(0)
    const [isBuildingGood, setIsBuildingGood] = useState<boolean>(true)
    const [reachedDewpoint, setReachedDewpoint] = useState<boolean>(false)
    const [hasCondensation, setHasCondensation] = useState<boolean>(false)
    const HUMIDITY_LOTS : number = 6
    const HUMIDITY_LITTLE: number = 2


    const outputDiscomfortReason = (): String => {
        let relHumidity: String = ""
        const discomfortDegree:String = comfort === -2? "very" : "somewhat"
        const humidity:String = userData.relHumidity > 65? "humid" : "dry"
        let temp:String = ""
        if (userData.temp > 22) {
            temp="hot"
        } else if (userData.temp < 14) {
            temp = "cold"
        } else {
            temp = "good"
        }

        if (userData.relHumidity > 65 ) {
            relHumidity = "humid"
        } else if (userData.relHumidity < 45) {
            relHumidity = "dry"
        } else {
            relHumidity = "good"
        }

        if (temp === "good" && relHumidity !== "good" ) {
            return `Temperature is good, but I still feel ${discomfortDegree} uncomfortable because it is too ${humidity}.`
        } else if (relHumidity === "good" && temp !=="good") {
            return `I feel comfortable, but the temperature is ${temp}.`
        }
        else {
            return `I feel ${discomfortDegree} uncomfortable because it is too ${humidity} and ${temp}.`
        }

    }

    //output in relative terms 
    const outputHumidity = () => {
        const humidity = userData.humidity
        const maxHumidity = calculateMaxHumidity(userData.temp)
        if (humidity === maxHumidity) {
            return `the maximum amount`
        } else if (humidity >= HUMIDITY_LOTS ) {
            return `lots`
        } else if (humidity <= HUMIDITY_LITTLE) {
            return `a little bit`
        } else {
            return `a medium amount`
        }
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

        if (userData.temp > 22 || userData.temp < 14) {
            setComfort(-1)
        } else if (relHumidity > 75 || relHumidity < 35) {
            setComfort(-2)
        } else if (relHumidity > 65 || relHumidity < 45) {
            setComfort(-1)
        } else if (relHumidity <=65 && relHumidity >=45) {
            setComfort(0)
        } 

        const condensation = userData.condensation
        if ( condensation > 0) {
            setHasCondensation(true)
        } else {
            setHasCondensation(false)
        }

    }, [userData,updateData])


    return (
        //these will be svgs at some point
        //To add: explanation TextclassName="Outcome" 
        //have something for temp and something for humidity/dryness
        <CssVarsProvider>
            <Sheet className="Outcome"  variant='soft' sx={
                {width:'90%', height:'90%',padding: 'auto', margin:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', justifySelf:'end' }
                }>
                <Box id='HumidityInfo'>The air currently "holds" {outputHumidity()} of humidity. {hasCondensation && `${userData.condensation} "unit(s)" of humidity have become condensed due to lower temperatures.`}</Box>
                <Box id='Comfort'>{comfort<0? outputDiscomfortReason(): `Person feels comfortable.`}</Box>
                <Box id='Building'>{!isBuildingGood && `Building is at risk of damage.`}</Box>
                <Box id='Window'>{reachedDewpoint && `Dewpoint has been reached. This is very bad!`}</Box>
            </Sheet>
        </CssVarsProvider>
    )
}