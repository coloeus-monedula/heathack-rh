import { useEffect, useState } from "react"
import { ButtonUnstyled } from "@mui/base"
import { Data, Props } from "../App"

export function Dehumidifer({userData, updateData}: Props) {
    const [canClick, setCanClick] = useState<boolean>(true)
    
    const handleMinusHumidity = () => {
        const humidity = userData.humidity
        if (humidity > 1) {
            const updatedData : Data= {
                ... userData,
                'humidity': humidity-1
            }

            updateData(updatedData)
        }
    }

    useEffect(() => {
        const humidity = userData.humidity
        if (humidity > 1) {
            setCanClick(true)
        } else {
            setCanClick(false)
        }
    }, [setCanClick, userData])


    return(
        <div>
            {canClick
                ? <ButtonUnstyled onClick={handleMinusHumidity}>Dehumidifier</ButtonUnstyled>
                : <ButtonUnstyled onClick={handleMinusHumidity} disabled>Dehumidifier</ButtonUnstyled>
            }
        </div>
    )
}