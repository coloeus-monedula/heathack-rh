import CircularSlider from 'advanced-react-circular-slider';
import 'advanced-react-circular-slider/main.css';
import { useEffect, useState } from 'react';
import { Data, Props } from "../App";

export function Temperature({userData, updateData, defaults, reset}: Props) {
    //for (re)setting temp knob
    const [index, setIndex] = useState<number>(defaults.tempKnobIndex)

    const handleTempChange = (e: { key: string; value: number; }) : void => {
        const temp = e.value
        const updatedData: Data = {
            ... userData,
            "temp": temp
        }
        updateData(updatedData)
    }

    useEffect(() => {
        // console.log("Temp reset")
        // console.log(reset)
        if (reset) {
            console.log(userData)
            const temp = userData.temp
            const newIndex = temp/5
            setIndex(newIndex)
            // console.log(index)
        }
    },[userData, index, reset])

    return (
        <CircularSlider
        width={200}
        labelTop=" "
        min={5}
        max={30}
        step={5}
        labelStep={5}
        onChange={handleTempChange}
        magentTolerance={20}
        valueFontSize="3rem"
        labelBottom="°C"
        progressColorFrom="#2366e8"
        progressColorTo="#e84623"
        progressSize={15}
        dataIndex={index}
        />
    )
}