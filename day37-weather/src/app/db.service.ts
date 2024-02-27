import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { City } from "./models";
import { Subject, count } from "rxjs";

@Injectable()
export class DBService extends Dexie {

    city: Dexie.Table<City, string>

    //for reactivity -> refreshing of page
    onCities = new Subject<City[]>

    constructor() {
        super('city')
        this.version(1).stores({
            city: "name"
        })
        this.city = this.table('city')
        this.getList().then(
            (result) => this.onCities.next(result)
        )

    }

    //save city into db
    save(city: City): Promise<string> {
        return this.city.add(city)
    }

    //retrieve the list of cities
    getList(): Promise<City[]> {
        return this.city.toArray()
    }

    //check if city already exists
    cityExist(c: string): Promise<boolean> {
        return this.city
            .where('name')
            .equalsIgnoreCase(c)
            //check the no of values
            .count()
            //check if count is more than 0
            .then(count => count>0)
    }

    //delete by city
    deleteCity(id: string): Promise<any> {
        return this.city.delete(id)
    }
}