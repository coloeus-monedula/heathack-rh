import { userData } from "../util/userData";
import CircularSlider from 'advanced-react-circular-slider';
import 'advanced-react-circular-slider/main.css';
import { Props } from "../App";

export function Temperature({userData}: Props) {
    const handleTempChange = (e: { key: string; value: number; }) : void => {
        const updatedData: userData = {
            ... userData.getData(),
            "temp": e.value
        }
        userData.setData(updatedData)
        // console.log(props.userData.getData())
    }

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
        />
    )
}