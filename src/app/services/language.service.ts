import { Injectable } from '@angular/core';
import { Language } from 'app/model/LanguageEnum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private readonly _storageSvg:StorageService) {
    this.lang = this._storageSvg.getCurrentLanguage();
   }
  public getCurrentLanguage():Language{
    return this.lang
  }

  public changeLanguage(newLang:Language){
    this.lang= newLang;
  }
  private lang!:Language;
}
