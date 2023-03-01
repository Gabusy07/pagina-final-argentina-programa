import { Language } from "./LanguageEnum";

export class Description {

    constructor(text: String, title: String, photo: String, namePhoto: String, language : Language){
        this.text = text;
        this.title = title;
        this.photo = photo;
        this.namePhoto = namePhoto;
        this.language = language;
    }

    public id!: number;
    public text!: String;
    public title!: String;
    public photo!: String;
    public namePhoto!: String;
    public language!: Language

}