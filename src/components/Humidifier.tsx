import { ButtonUnstyled } from "@mui/base";
import { useEffect } from "react";
import { useState } from "react";
import { Props } from "../App";
import { calculateMaxHumidity } from "../util/calculations";
import { userData } from "../util/userData";

export function Humidifier({userData} : Props) {
    //TODO: change this to something more legit
    const [maxHumidity, setMaxHumidity] = useState<number>(10)
    const [canClick, setCanClick] = useState<boolean>(true)

    //TODO: maybe vary incrementation
    const handleAddHumidity = () : void => {
        const humidity = userData.getData().humidity
        if (humidity < maxHumidity) {
            const updatedData : userData = {
                ... userData.getData(),
                'humidity': humidity+1
            }

            userData.setData(updatedData)
            console.log(userData.getData())
        }
    }

    //auto updates maxHumidity and whether or not button can be clicked
    useEffect(() => {
        const temp = userData.getData().temp
        const humidity = userData.getData().humidity
        setMaxHumidity(calculateMaxHumidity(temp, humidity))

        if (humidity > maxHumidity) {
            setCanClick(false)
        } else {
            setCanClick(true)
        }

    }, [userData.getData()])


    return(
        <div>
            {canClick
                ? <ButtonUnstyled onClick={handleAddHumidity}>Humidifier</ButtonUnstyled>
                : <ButtonUnstyled onClick={handleAddHumidity} disabled>Humidifier</ButtonUnstyled>
            }
        </div>
    )
    
}