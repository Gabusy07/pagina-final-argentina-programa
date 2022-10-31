export class Description {

    constructor(text: String, title: String, photo: String, namePhoto: String){
        this.text = text;
        this.title = title;
        this.photo = photo;
        this.namePhoto = namePhoto;
    }

    public id!: BigInt;
    public text!: String;
    public title!: String;
    public photo!: String;
    public namePhoto!: String;

}