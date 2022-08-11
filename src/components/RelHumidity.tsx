import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Props } from "../App";
import { calculateRelHumidity } from "../util/calculations";

export function RelHumidity({userData, updateData}: Props){
    const [relHumidity, setRelHumidity] = useState<number>(33)

    useEffect(() =>{
        const newRelHumidity = calculateRelHumidity(userData.temp, userData.humidity)
        setRelHumidity(newRelHumidity)
    },[userData])

    return (
        <ReactSpeedometer
        minValue={0}
        maxValue={100}
        value={relHumidity}
        startColor="#abdbe3"
        endColor="#154c79"
        segments={1000}
        maxSegmentLabels={5}
        currentValueText= "${value}%"
        />
    )
}