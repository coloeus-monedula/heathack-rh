import { ButtonUnstyled } from "@mui/base";
import { Data, userData } from "../util/userData";


export function Reset(props: { userData: Data; }): JSX.Element  {

    const defaults : userData = {
        temp: 10,
        humidity: 10
    }

    const handleResetData = () : void => {
        props.userData.setData(defaults)
        console.log(props.userData.getData())
    }

    return (
        <ButtonUnstyled onClick={handleResetData}>Reset</ButtonUnstyled>
    )
}

