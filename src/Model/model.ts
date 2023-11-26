export interface Data {
    id: number,
    name: string,
    visibility: number,
    coord: Coord,
    main: Main
  }

  export interface Coord {
    lat:number,
    lon:number
  }

  export interface Main {
    temp:number,
    humidity: number,
    pressure: number
  }
  
  