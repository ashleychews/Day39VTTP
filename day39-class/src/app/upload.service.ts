import { Injectable, inject } from "@angular/core";
import { dataURItoBlob } from "./utils";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UploadService {

    private http = inject(HttpClient)

    upload(dataUrl: string) {
        const blob = dataURItoBlob(dataUrl)
        //important to set the type!! -> browser does not know what type of file
        const file = new File([blob], 'captured.jpg', {type: 'image.jpg'})
        console.info('file', file)

        //multipart form data
        //name must follow the backend (@RequestMultipart)
        //<input type="file" name="image">
        const form = new FormData()
        form.set('image', file)

        //using promise
        return firstValueFrom(
            this.http.post<any>("http://localhost:8080/picture", form)
        )

    }

}