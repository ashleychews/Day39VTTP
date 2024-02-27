export interface Weather {
    name: string
    temp: number
    pressure: number
    humidity: number
    description: string
    speed: number
    deg: number
}

export interface City {
    id?: string
    name: string
}

export interface CitySlice {
    city: City[]
}