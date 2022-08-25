import { LinearProgress, linearProgressClasses, LinearProgressProps } from "@mui/material";
import { Props } from "../App";
import { Box, CssVarsProvider, Typography } from "@mui/joy";
import { useState, useEffect } from "react";


export default function Thermostat({userData, updateData}: Props) {
  
  const [temp, setTemp] = useState<number>(5)
  const MIN = 0
  const MAX = 30
  
  // normalising funcs based off
  // https://mui.com/material-ui/react-progress/#non-standard-ranges
  const normalise = (value:number) => ((value - MIN) * 100) / (MAX - MIN);
  
  // linear progress based off 
  //https://mui.com/material-ui/react-progress/#LinearWithValueLabel.tsx
  function LinearProgressWithLabel(props: LinearProgressProps & { value: number, original:number }) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:"column-reverse" }}>
          <Box sx={{ height: 200, width:200}}>
            <LinearProgress variant="determinate" {...props} sx={{
              transform: "rotate(270deg) translate(-50%, -50%)" ,
              height:10,
              borderRadius:5,
              backgroundColor:"#d3d3d3",
              '& .MuiLinearProgress-bar':{
                borderRadius:5,
                animationDuration:"1.7s"
              }
            }} />
          </Box>
          <Box sx={{ width: 35 }}>
            <Typography color="neutral" level="h6">{`${Math.round(
              props.original,
            )}°C`}</Typography>
          </Box>
        </Box>
      );
    }

    useEffect(() => {
      setTemp(userData.temp)
    }, [userData]);
    return(
        <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={normalise(temp)} original={temp} color="error" />
        </Box>
    )
}