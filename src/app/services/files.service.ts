import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private storage: AngularFireStorage) {}



  uploadFile(file: File):Observable<number> | any{
    const filePath = 'images/'+file.name;
    this.task = this.storage.upload(filePath, file);
    return this.task;
  }


  getPercentageChanges(){
      return this.task.percentageChanges();
    }
    

  getRef(file:File):any{
    const filePath = 'images/'+file.name;
    return this.storage.ref(filePath);

  }


  public task!:any;


  /*
public uploadFiles(file:any):boolean | void{
  const imgRef = ref(this.storage, `images/${file.name}`);
  uploadBytes(imgRef, file).then(
    response  =>{ 
      this.getImages()
      console.log(response)
    }
  ).catch(error => console.log(error))
}



public getImages():Promise<any>{
    const imagesRef = ref(this.storage, 'images');
    return listAll(imagesRef);
  }

public deleteImage(imageRef:any):void{
  let url = "";

  this.getImages().then(async response => {
    let url = await getDownloadURL(response.items[0]); 
}).catch(error => console.log(error)).finally(()=> {
  
  const desertRef = ref(this.storage, 'images/'+url);
  
  console.log(desertRef.fullPath)
  alert()
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  
})
  }*/

}

