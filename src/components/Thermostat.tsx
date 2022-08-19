import { LinearProgress, LinearProgressProps } from "@mui/material";
import { Props } from "../App";
import { Box, CssVarsProvider, Typography } from "@mui/joy";
import { useState, useEffect } from "react";

// linear progress based off 
//https://mui.com/material-ui/react-progress/#LinearWithValueLabel.tsx


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:"column-reverse" }}>
        <Box sx={{ minHeight: 270, width:'70%'}}>
          <LinearProgress variant="determinate" {...props} sx={{
            transform: "rotate(270deg) translate(-50%, 0)" 
          }} />
        </Box>
        <Box sx={{ width: 35 }}>
          <Typography color="neutral" level="body2">{`${Math.round(
            props.value,
          )}%`}</Typography>
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
        <LinearProgressWithLabel value={temp} color="warning" sx={{

        }}/>
        </Box>
    )
}