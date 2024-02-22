import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './components/entry.component';
import { ListingsComponent } from './components/listings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoStore } from './todo.store';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    ListingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TodoStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
