export class Description {

    constructor(text: String, title: String, photo: String, name_photo: String){
        this.text = text;
        this.title = title;
        this.photo = photo;
        this.name_photo = name_photo;
    }

    public id!: BigInt;
    public text!: String;
    public title!: String;
    public photo!: String;
    public name_photo!: String;

}