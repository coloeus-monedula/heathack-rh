//stores userData type and allows for updating of this

export type userData = {
    temp: number;
    humidity: number;
  
}

export class Data {
  //default values
  numbers : userData = {
    temp: 0, 
    humidity: 0,
  }

  constructor(startData: userData) {
    this.numbers = {... startData}
  }

  getData = () : userData => this.numbers;
  setData = (newData: userData) : void => {
    this.numbers = {...newData}
  }
}
