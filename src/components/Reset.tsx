import { ButtonUnstyled } from "@mui/base";
import { Props } from "../App";
import { userData } from "../util/userData";


export function Reset({userData} : Props): JSX.Element  {

    const defaults : userData = {
        temp: 10,
        humidity: 10
    }

    const handleResetData = () : void => {
        userData.setData(defaults)
    }

    return (
        <ButtonUnstyled onClick={handleResetData}>Reset</ButtonUnstyled>
    )
}

