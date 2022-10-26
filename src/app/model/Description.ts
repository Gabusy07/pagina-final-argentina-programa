export class Description {

    constructor(text: String, title: String, photo: String){
        this.text = text;
        this.title = title;
        this.photo = photo;
    }

    public id!: BigInt;
    public text!: String;
    public title!: String;
    public photo!: String;

}