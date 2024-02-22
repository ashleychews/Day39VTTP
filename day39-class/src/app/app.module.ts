import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { SnapComponent } from './components/snap.component';
import { UploadService } from './upload.service';
import { HttpClientModule } from '@angular/common/http';
import { EntryComponent } from './components/entry.component';

@NgModule({
  declarations: [
    AppComponent,
    SnapComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
