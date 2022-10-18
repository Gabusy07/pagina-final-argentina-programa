export class Language {

    constructor(name: String, date: String){
        this.name = name;
        this.date_start = date;   

    }
    

    

    private id!: BigInt;
    public name!: String;
    public progressbar!: String;
    public width!: number;
    public date_start!: String;


}