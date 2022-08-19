import { LinearProgress, linearProgressClasses, LinearProgressProps } from "@mui/material";
import { Props } from "../App";
import { Box, CssVarsProvider, Typography } from "@mui/joy";
import { useState, useEffect } from "react";

// linear progress based off 
//https://mui.com/material-ui/react-progress/#LinearWithValueLabel.tsx
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:"column-reverse" , height:400, width:400}}>
        <Box sx={{ height: 350, width:340}}>
          <LinearProgress variant="determinate" {...props} sx={{
            transform: "rotate(270deg) translate(-50%, 0)" ,
            height:10,
            borderRadius:5,
            backgroundColor:"#d3d3d3",
            '& .MuiLinearProgress-bar':{
              borderRadius:5,
            }
          }} />
        </Box>
        <Box sx={{ width: 35 }}>
          <Typography color="neutral" level="h6">{`${Math.round(
            props.value,
          )}°C`}</Typography>
        </Box>
      </Box>
    );
  }

export default function Thermostat({userData, updateData}: Props) {

    const [temp, setTemp] = useState<number>(15)

    useEffect(() => {
      const timer = setInterval(() => {
        setTemp((prevTemp) => (prevTemp >= 100 ? 10 : prevTemp + 10));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return(
        <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={temp} color="error" sx={{

        }}/>
        </Box>
    )
}