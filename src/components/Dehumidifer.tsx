import { useEffect, useState } from "react"
import { Data, Props } from "../App"
import { Button } from "@mui/joy";
import { CssVarsProvider } from '@mui/joy/styles';

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
        <CssVarsProvider>
            {canClick
                ? <Button onClick={handleMinusHumidity} variant="soft">Dehumidifier</Button>
                : <Button onClick={handleMinusHumidity} variant="soft" disabled>Dehumidifier</Button>
            }
        </CssVarsProvider>
    )
}