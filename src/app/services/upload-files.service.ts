import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private storage: Storage) {
    this.images = [];
   }

uploadFiles(file:any):void{
  const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file).then(
      response => {
        console.log(response)
        this.getImages();
      }
    ).catch(error => console.log(error));
}



 getImages() {
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  images: string[];
}
