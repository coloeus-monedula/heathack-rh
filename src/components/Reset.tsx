import { Props } from "../App";
import { Button } from "@mui/joy";
import { CssVarsProvider } from '@mui/joy/styles';
import '../App.css'




export function Reset({updateData, defaults} : Props): JSX.Element  {


    const handleResetData = () : void => {
        updateData(defaults.data)
    }

    return (
        <CssVarsProvider>
            <Button 
            onClick={handleResetData} size="lg"
            >Reset</Button>
        </CssVarsProvider>
    )
}

