import {  Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private storage: AngularFireStorage, private toastr:ToastrService) {}



  uploadFile(file: File, folderName:String):Observable<number> | any{
    const filePath = folderName+file.name;
    this.task = this.storage.upload(filePath, file);
    return this.task;
  }

  deleteFile(name : String, folder:String):Observable<number> | any{
    const fileRef = this.getRef(name, folder)
    return fileRef.delete();

  }


  getPercentageChanges(){
      return this.task.percentageChanges();
    }
    

  getRef(name:String, folder:String):AngularFireStorageReference{
    const filePath =  `${folder}${name}`;
    return this.storage.ref(filePath);
  }

  public isFileValid(file:any):boolean{
    //verifica que el archivo seleccionado sea img
    //EXTENSIONES PERMITIDO.
      var ext_availables = [".png", ".bmp", ".jpg", ".jpeg", ".svg"];
      var route = file.name;
      var last_dot = file.name.lastIndexOf(".");
      var extension = route.slice(last_dot, route.length);
      if(ext_availables.indexOf(extension) == -1)
      {
          this.toastr.warning("las imagenes solo pueden ser png, bmb, jpg , jpeg o svg","archivo no válido");
          file.name = "";
          return false;
      }
      return true;
  }

  public task!:any;

}

