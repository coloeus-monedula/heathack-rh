import { CssVarsProvider } from '@mui/joy/styles';
import { Sheet } from '@mui/joy';
import { Box } from '@mui/system';
import { Props } from '../App';
import { useEffect, useState } from 'react';
import '../App.css'
import { calculateMaxHumidity } from '../util/calculations';
import comfortable from '../assets/comfortable.png'
import okHot from '../assets/ok but hot.png'
import okCold from '../assets/ok but cold.png'
import uncomfortCold from '../assets/slightly uncomfortable cold.png'
import uncomfortHot from '../assets/slightly uncomfortable hot.png'
import uncomfort from '../assets/slightly uncomfortable.png'
import vUncomfortCold from '../assets/v uncomfortable cold.png'
import vUncomfort from '../assets/v uncomfortable.png'
import vUncomfortHot from '../assets/v uncomfortable hot.png'
import window from '../assets/window.png'
import windowCondensed from '../assets/window condensed.png'
import building from '../assets/building.png'
import buildingDewpoint from '../assets/building dewpoint.png'
import buildingWarning from '../assets/building warning.png'



export function Outcomes({userData, updateData}:Props): JSX.Element {
    //0 is good, -1 is uncomfortable, -2 very uncomfortable
    const [comfort, setComfort] = useState<number>(0)
    const [isBuildingGood, setIsBuildingGood] = useState<boolean>(true)
    const [reachedDewpoint, setReachedDewpoint] = useState<boolean>(false)
    const [hasCondensation, setHasCondensation] = useState<boolean>(false)
    const HUMIDITY_LOTS : number = 6
    const HUMIDITY_LITTLE: number = 2
    const TEMP_HOT: number = 22
    const TEMP_COLD: number = 14


    const outputDiscomfortReason = (): String => {
        let relHumidity: String = ""
        const discomfortDegree:String = comfort === -2? "very" : "somewhat"
        const humidity:String = userData.relHumidity > 65? "humid" : "dry"
        let temp:String = ""
        if (userData.temp > TEMP_HOT) {
            temp="hot"
        } else if (userData.temp < TEMP_COLD) {
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
            //TODO: ask if this one is needed
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
        if (humidity === maxHumidity || humidity > maxHumidity) {
            return `the maximum amount`
        } else if (humidity >= HUMIDITY_LOTS ) {
            return `lots`
        } else if (humidity <= HUMIDITY_LITTLE) {
            return `a little bit`
        } else {
            return `a medium amount`
        }
    }
    
    const outputImages = () :JSX.Element => {
        const windowStatus = hasCondensation? windowCondensed: window
        let buildingStatus: string
        let personStatus: string

        if (reachedDewpoint) {
            buildingStatus = buildingDewpoint
        } else if (!isBuildingGood) {
            buildingStatus = buildingWarning
        } else {
            buildingStatus = building
        }

        let temp: number = 0
        if (userData.temp > TEMP_HOT) {
            temp = 1
        } else if (userData.temp < TEMP_COLD) {
            temp = -1
        } else {
            temp = 0
        }

        let relHumidity:number = 0
        if (userData.relHumidity > 75 || userData.relHumidity < 35) {
            relHumidity = -2
        } else if (userData.relHumidity > 65 || userData.relHumidity < 45) {
            relHumidity = -1
        } else {
            relHumidity = 0
        }

        if (relHumidity === 0 && temp === 0 ) {
            personStatus = comfortable
        } else if (relHumidity === 0 && temp === 1) {
            personStatus = okHot
        } else if (relHumidity === 0 && temp === -1) {
            personStatus = okCold
        } else if (relHumidity === -1 && temp === 0) {
            personStatus = uncomfort
        } else if (relHumidity === -1 && temp === 1) {
            personStatus = uncomfortHot
        } else if (relHumidity === -1 && temp === -1) {
            personStatus = uncomfortCold
        } else if (relHumidity === -2 && temp === 0) {
            personStatus = vUncomfort
        } else if (relHumidity === -2 && temp === 1) {
            personStatus = vUncomfortHot
        } else if (relHumidity === -2 && temp === -1) {
            personStatus = vUncomfortCold
        } else {
            personStatus = comfortable
        }

        return <Box id="Images" sx ={{maxHeight: "70%",display:'flex', justifyContent:'space-evenly', marginTop:'10px', flexWrap:'wrap', alignItems:'center'}}>
                 <img src={buildingStatus} style={{width: '50%', height:'50%'}} alt="building health"/> <img src={personStatus} alt ="human comfort"/> <img src={windowStatus} alt="window"/>
            </Box>
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
        } else if (userData.temp > TEMP_HOT || userData.temp < TEMP_COLD) {
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
                {width:'90%', height:'85%',padding: 'auto', margin:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', justifySelf:'end' }
                }>
                <Box id='HumidityInfo'>The air currently "holds" {outputHumidity()} of humidity. {hasCondensation && `Due to lower temperatures and the air being unable to "hold" as much humidity, condensation is forming.`}</Box>
                <Box id='Comfort'>{comfort<0? outputDiscomfortReason(): `Person feels comfortable.`}</Box>
                <Box id='Building'>{!isBuildingGood && `Building is at risk of damage.`}</Box>
                <Box id='Window'>{reachedDewpoint && `Dewpoint has been reached. This is very bad!`}</Box>
                {outputImages()} 

            </Sheet>
        </CssVarsProvider>
    )
}