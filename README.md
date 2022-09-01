This is a simulation demonstrating the relationship between relative humidity and comfort for the [HeatHack](https://heathack.org) project, done as a St Andrews Research Internship Scheme ([https://www.st-andrews.ac.uk/students/academic/internships/staris/](STARIS)) project (6 blocks).

# Installation
In the folder where the yarn.lock file is, type `yarn install` into the terminal. The technologies used in this model include Typescript, React and MUI (both Material UI and Joy UI used).

# Running
[Create React App](https://github.com/facebook/create-react-app) was used to bootstrap the project, so commands to run the project locally are unchanged:
- `yarn start` runs the app in development mode.
- `yarn build` builds the app for production in the build/ folder. A static site server can be started for it by running `serve -s build`.

To host the project on Github pages, follow this guide: https://github.com/gitname/react-gh-pages. For cleanliness, use yarn instead of npm for the instructions - ie. `yarn add` instead of npm install, and `yarn build` instead of `npm run build` for the predeploy script. To run the deploy script, simply type `yarn deploy`. An example deployment can be seen in the gh-pages branch.

# Simulation Information
The aims of this simulation are as such:
- To demonstrate that a higher temperature can "hold" more humidity in the air
- That relative humidity plays a surprisingly big role in how someone perceives how comfortable a building in
- That too high of a relative humidity can have more consequences other than human discomfort, such as building damage and condensation (if dew point is reached and then the temperature decreases).

## Controls
- The "Heater" toggle increases the temperature of the room when on to a maximum of 30C, and without it the temperature decreases to a minimum of 5C.
- Humidifier and Dehumifier increases and decreases the humidity in the air respectively.
- Reset restores the humidity and temperature values to default (though it will not reset the Heater toggle to off).

## Assumptions
### Clothing
Clothing is not considered in this simulation, where in reality it is a factor in someone's comfort for a given temperature/humidity. See https://comfort.cbe.berkeley.edu for more information. It will be assumed someone in the room will wear appropiate clothing for room conditions.

### Comfort and temperature
It is assumed that people will be comfortable as long as the relative humidity is within comfort bounds, regardless of the temperature. This is why temperature is not commented on until the relative humidity is out of comfort bounds.

## Formulae and Bounds
Equations used can be found in util>calculations.ts. Bounds used are mentioned below.

### Relative Humidity
- 45-65%: Comfortable for someone to be in.
- 35-45%, or 65-75%: Slightly uncomfortable for someone to be in.
- Less than 35% or more than 75%: Very uncomfortable for someone to be in.
- 80% and above: Risk of building damage.
- 100%: Dewpoint reached (air is at "maximum humidity").

### Temperature
Comfortable temperature is set to between 14-22 Celsius (inclusive). Outside of these temperatures, the simulation will comment if the temperature is hot or cold. 

Temperature range is from 5C - 30C. Default starting temperature is at 15C.

### Humidity
Minimum humidity is always 1 arbitrary "unit" of humidity, and the humidifer/dehumidifer also modifies the humidity in the air by 1 "unit" every time the button is clicked. Default humidity is 3 "units".


# Limitations
## Compatibility and Accesibility
**Due to time limitations, the model has not been extensively tested on other browsers, nor checked for accesibility guidelines.** The project was developed on a Chromium (Vivaldi) browser, which was also the main browser used to debug and examine UI. Create React App does include Babel for backwards compatibility, however.

## Accuracy
As mentioned above, this is a toy model meant for demonstration rather than accuracy. As such, the relative humidity readouts for a given level of humidity and temperature cannot be assumed to be scientifically accurate. Formulae used are dummy formulae.

Other limitations are mentioned under the "Assumptions" header in "Simulation Information".
