import { Component } from '@angular/core';
import { Language } from './model/LanguageEnum';
import { StorageService } from './services/storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly _storageSvg:StorageService) {
     this._storageSvg.addLanguageToStorage(Language.SPANISH)
  }
  title = 'gmr-porfolio';
  porfolioLanguage!:Language
}
