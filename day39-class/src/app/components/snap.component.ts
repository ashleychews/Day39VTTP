import { Component, OnInit, inject } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { dataURItoBlob } from '../utils';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-snap',
  templateUrl: './snap.component.html',
  styleUrl: './snap.component.css'
})
export class SnapComponent implements OnInit {


  image = '/assets/placeholder.jpg'

  private uploadSvc = inject(UploadService)

  //create observable
  protected trigger$!: Observable<void>

  //trigger image snap
  private triggerSub = new Subject<void>

  private canUpload = false

  ngOnInit(): void {
    this.trigger$ = this.triggerSub.asObservable()
  }

  snap() {
    this.triggerSub.next()
  }

  //capture the image
  handleImage(webcamImage: WebcamImage): void {
    console.info("your picture", webcamImage)
    this.image = webcamImage.imageAsDataUrl
    this.canUpload = true

  }

  upload() {
    if (!this.canUpload)
    return
      this.uploadSvc.upload(this.image)
      .then(result => {
        console.info('response: ', result)
    })
  }

  clear() {
    this.canUpload = false
    this.image = '/assets/placeholder.jpg'
  }

}
