import { Data, Props } from "../App";
import { Button } from "@mui/joy";
import { CssVarsProvider } from '@mui/joy/styles';



export function Reset({userData, updateData, defaults} : Props): JSX.Element  {


    const handleResetData = () : void => {
        updateData(defaults.data)
    }

    return (
        <CssVarsProvider>
            <Button 
            onClick={handleResetData} 
            >Reset</Button>
        </CssVarsProvider>
    )
}

