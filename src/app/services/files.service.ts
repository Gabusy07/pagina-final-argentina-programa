import {  Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';


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

  deleteFile(name : String):Observable<number> | any{
    const fileRef = this.getRef(name)
    return fileRef.delete();

  }


  getPercentageChanges(){
      return this.task.percentageChanges();
    }
    

  getRef(name:String):AngularFireStorageReference{
    const filePath =  `images/${name}`;
    return this.storage.ref(filePath);
  }

  public task!:any;

}

