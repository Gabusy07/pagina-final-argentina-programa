import { Injectable } from '@angular/core';
import { Language } from 'app/model/LanguageEnum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
   }

  public getCurrentLanguage():Language{
    return this.lang
  }

  public changeLanguage(newLang:Language){
    this.lang= newLang;
  }
  private lang!:Language;
}
