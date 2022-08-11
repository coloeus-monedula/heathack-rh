import { ButtonUnstyled } from "@mui/base";
import { Data, Props } from "../App";


export function Reset({userData, updateData, defaults, setReset} : Props): JSX.Element  {


    const handleResetData = () : void => {
        updateData(defaults.data)
        if (setReset) {
            setReset(true)
            // console.log("Reset")
        }

    }

    return (
        <ButtonUnstyled onClick={handleResetData}>Reset</ButtonUnstyled>
    )
}

