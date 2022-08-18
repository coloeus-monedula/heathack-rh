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
    //so higher the temp, the comparatively higher the mock saturated vapour density
    return Math.round(2*(temp/5))  
}

//if the temp is high - holds a lot of humidity, but then is dropped down - humidity condenses
export const calculateCondensation = (temp:number,humidity: number): number => {
    const maxHumidity = calculateMaxHumidity(temp)
    if (humidity > maxHumidity) {
        return humidity - maxHumidity
    } else {
        return 0
    }
}