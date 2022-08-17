//calculates relative humidity, where R.H = vapour density aka 'humidity' / saturated vapour density aka. 'maxHumidity'
//returns as percentage rounded to nearest int
export const calculateRelHumidity = (temp: number, humidity: number) : number => {
    const maxHumidity = calculateMaxHumidity(temp)
    //max rel.humidity is 100%
    //NOTE: may need to adjust for dew point
    return Math.min(Math.round((humidity/maxHumidity)*100), 100)
}

//returns a mock saturated vapour density
export const calculateMaxHumidity = (temp: number): number => {
    //will range from 3 to 8
    return (temp/5) + 2
}