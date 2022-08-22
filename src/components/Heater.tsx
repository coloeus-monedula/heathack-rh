import { useEffect, useState } from "react"
import { Data, Props } from "../App"
import { CssVarsProvider, styled } from '@mui/joy/styles';

//ToggleButton code and styling taken from
//https://mui.com/joy-ui/customization/approaches/#reusable-component
const ToggleButton = styled('button')(
    ({ theme, 'aria-pressed': pressed = 'false' }) => ({
      padding: '0.5rem 1rem',
      borderRadius: theme.vars.radius.sm,
      display: 'inline-flex',
      justifyContent: 'center',
      gap: '8px',
      minHeight: 40,
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.md,
      fontWeight: theme.vars.fontWeight.md,
      alignItems: 'center',
      border: '1px solid',
      borderColor: theme.vars.palette.neutral.outlinedBorder,
      backgroundColor: theme.vars.palette.background.body,
      boxShadow: theme.vars.shadow.md,
      [theme.focus.selector]: theme.focus.default,
      ...theme.variants.plain.neutral,
      ...(pressed === 'false' && {
        '&:hover': theme.variants.plainHover.neutral,
        '&:active': theme.variants.plainActive.neutral,
      }),
      ...(pressed === 'true' && {
        color: theme.vars.palette.danger.plainColor,
        backgroundColor: theme.vars.palette.background.body,
        boxShadow: theme.shadow.sm.replace(/,/g, ', inset'),
      }),
    }),
  );
  

export default function Heater({userData,updateData, defaults}:Props) {
    const [isOn, setIsOn] = useState<boolean>(defaults.data.on)


    const toggleHeating = () => {
        const opposite = !isOn
        setIsOn(opposite)

        const updated :Data= {
            ...userData,
            "on":opposite
        }

        updateData(updated)

    }


    useEffect(() => {
      let temp:number
      if (isOn) {
        temp = userData.temp>= 30? 30 : userData.temp + 1

        }
       else {
        temp = userData.temp<= 5? 5 : userData.temp - 1
      }

      const timer = setInterval(() => {
        const updated = {
          "on": userData.on,
          "humidity": userData.humidity,
          "condensation": userData.condensation,
          "relHumidity": userData.relHumidity,
          "temp":temp
        }

        updateData(updated)

        console.log(temp)
      }, 1700);
      return () => {
        clearInterval(timer);
      }
    }, [ isOn, userData.humidity, userData.condensation, userData.relHumidity, userData.on, userData.temp, updateData])
    //dependencies written out individually because adding userData as a dep automatically goes to clearInterval
    //without running the timer

    return (
        <CssVarsProvider>
            <ToggleButton
                aria-pressed={isOn? 'true':'false'}
                onClick={toggleHeating}
                sx ={{width:120, height: 100}}>
                    Heating {isOn? `On`:`Off`}
            </ToggleButton>
        </CssVarsProvider>
    )
}