import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { City } from '../models';
import { Observable } from 'rxjs';
import { CityStore } from '../city.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private dbSvc = inject(DBService)
  private cityStore = inject(CityStore)

  cityList$!: Observable<City[]>

  form!: FormGroup
  
  ngOnInit(): void {
    this.form = this.createForm()
    //get list from db service, load list to store
    this.dbSvc.getList()
      .then((city: City[]) => this.cityStore.loadToStore(city))

    //update list with the list from store
    this.cityList$ = this.cityStore.getAllCities

    //update list with list from db
    //this.cityList$ = this.dbSvc.onCities.asObservable()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required])
    })
  }

  //add city to store and to db
  addCity() {

    const cityValue: string = this.form.value['city']
    console.info("adding city", cityValue)

    // Check if city already exists in the database
    this.dbSvc.cityExist(cityValue)
    .then(cityExists => {
        if (!cityExists) {
        // If city does not exist, add it to the store and save to DB
        const newCity: City = { name: cityValue };
        this.cityStore.addToStore(newCity);

        // Save the new city directly to the database
        this.dbSvc.save(newCity)
          .then(result => {
            console.info('City added successfully:', cityValue);
          })
          .catch(error => {
            console.error('Error saving to database:', error);
          })
        
        } else {
          alert('City already exists: ' + cityValue);
        }
        this.form.reset();
        })
  }

  navigate(city: string) {
    this.router.navigate(['/weather', city])
  }


  delete(name: string) {
    this.cityStore.deleteCityByName(name)
    this.dbSvc.deleteCity(name)
  }

}
