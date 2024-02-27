import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { City, CitySlice } from "./models";
import { v4 as uuidv4 } from 'uuid'

const INIT: CitySlice = {
    city: []
}

@Injectable()
export class CityStore extends ComponentStore<CitySlice> {

    constructor() { super(INIT) }

    //mutators
    //add to city to list
    readonly addToStore = this.updater<City> (
        (slice: CitySlice, value: City) => {
            value.id = uuidv4().substring(0, 8)
            //return copied slice
            return {
                city: [... slice.city, value]
            }
        }
    )
    
    //mutators
    //load list to store
    readonly loadToStore = this.updater<City[]> (
        (slice: CitySlice, values: City[]) => {
            return {
                city: values
            }
        }
    )

    //mutators
    //delete by name
    readonly deleteCityByName = this.updater<string> (
        (slice: CitySlice, name: string) => {
            return {
                city: slice.city.filter(city => name != city.name)
            }
        }
    )

    //selectors
    //get all the cities
    readonly getAllCities = this.select<City[]> (
        (slice: CitySlice) => slice.city
    )


}