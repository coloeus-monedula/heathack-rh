import { useEffect, useState } from "react"
import { ButtonUnstyled } from "@mui/base"
import { Props } from "../App"
import { userData } from "../util/userData"

export function Dehumidifer({userData}: Props) {
    const [canClick, setCanClick] = useState<boolean>(true)
    
    const handleMinusHumidity = () => {
        const humidity = userData.getData().humidity
        if (humidity > 0) {
            const updatedData : userData= {
                ... userData.getData(),
                'humidity': humidity-1
            }

            userData.setData(updatedData)
            console.log(userData.getData())
        }
    }

    useEffect(() => {
        const humidity = userData.getData().humidity
        if (humidity > 0) {
            setCanClick(true)
        } else {
            setCanClick(false)
        }
    })


    return(
        <div>
            {canClick
                ? <ButtonUnstyled onClick={handleMinusHumidity}>Humidifier</ButtonUnstyled>
                : <ButtonUnstyled onClick={handleMinusHumidity} disabled>Humidifier</ButtonUnstyled>
            }
        </div>
    )
}