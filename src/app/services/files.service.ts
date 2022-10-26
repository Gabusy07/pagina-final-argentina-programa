import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private storage: Storage) {
   }

uploadFiles(file:any):void{
  const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file).then(
      () => this.getImages()
    ).catch(error => console.log(error));
}


 getImages():Promise<any> {
    const imagesRef = ref(this.storage, 'images');
    return listAll(imagesRef);
  }


  

  
}
