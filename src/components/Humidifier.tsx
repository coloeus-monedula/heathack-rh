import { ButtonUnstyled } from "@mui/base";
import { useEffect } from "react";
import { useState } from "react";
import { Data, Props } from "../App";
import { calculateMaxHumidity } from "../util/calculations";

export function Humidifier({userData, updateData, defaults} : Props) {
    //TODO: change this to something more legit
    const [maxHumidity, setMaxHumidity] = useState<number>(defaults.maxHumidity)
    const [canClick, setCanClick] = useState<boolean>(true)

    //TODO: maybe vary incrementation
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
        <div>
            {canClick
                ? <ButtonUnstyled onClick={handleAddHumidity}>Humidifier</ButtonUnstyled>
                : <ButtonUnstyled onClick={handleAddHumidity} disabled>Humidifier</ButtonUnstyled>
            }
        </div>
    )
    
}